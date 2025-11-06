/**
 * LiveBoost - Validation avancée des réponses
 * Phase B : Normalisation et validation intelligente
 */

import type { Question, CustomQuestion } from './questions';

// ============================================
// TYPES
// ============================================

export interface ValidationOptions {
  caseSensitive?: boolean;
  allowTypos?: boolean;
  maxTypoDistance?: number;
  strictMode?: boolean;
  trimWhitespace?: boolean;
  removeAccents?: boolean;
  removeArticles?: boolean;
}

export interface ValidationResult {
  isCorrect: boolean;
  confidence: number; // 0-1 (1 = exact match)
  matchedVariant?: string;
  normalizedUserAnswer: string;
  normalizedExpectedAnswer: string;
  method: 'exact' | 'fuzzy' | 'variant';
  suggestions?: string[];
}

// ============================================
// OPTIONS PAR DÉFAUT
// ============================================

const DEFAULT_OPTIONS: ValidationOptions = {
  caseSensitive: false,
  allowTypos: true,
  maxTypoDistance: 2,
  strictMode: false,
  trimWhitespace: true,
  removeAccents: true,
  removeArticles: true
};

// ============================================
// NORMALISATION
// ============================================

/**
 * Normalise une chaîne de caractères pour la comparaison
 */
export function normalizeAnswer(
  answer: string,
  options: Partial<ValidationOptions> = {}
): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let normalized = answer;

  // Trim espaces
  if (opts.trimWhitespace) {
    normalized = normalized.trim();
  }

  // Casse
  if (!opts.caseSensitive) {
    normalized = normalized.toLowerCase();
  }

  // Accents
  if (opts.removeAccents) {
    normalized = normalized
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // Articles (le, la, les, un, une, l')
  if (opts.removeArticles) {
    normalized = normalized.replace(/^(le|la|les|un|une|l'|l )\s+/i, "");
  }

  // Multiple espaces → 1 espace
  normalized = normalized.replace(/\s+/g, " ").trim();

  return normalized;
}

/**
 * Nettoie une réponse de ponctuation excessive
 */
export function sanitizeAnswer(answer: string): string {
  return answer
    .replace(/[!?.,;:]+$/g, "") // Enlève ponctuation finale
    .replace(/\s+/g, " ") // Normalise espaces
    .trim();
}

// ============================================
// FUZZY MATCHING (Levenshtein Distance)
// ============================================

/**
 * Calcule la distance de Levenshtein entre 2 chaînes
 * (nombre de modifications nécessaires)
 */
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  // Initialisation
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Remplissage
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Suppression
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Calcule le score de similarité (0-1)
 */
export function similarity(str1: string, str2: string): number {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 1;
  
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLen;
}

/**
 * Vérifie si 2 chaînes sont "proches" (typos autorisées)
 */
export function isFuzzyMatch(
  str1: string,
  str2: string,
  maxDistance: number = 2
): boolean {
  const distance = levenshteinDistance(str1, str2);
  return distance <= maxDistance;
}

// ============================================
// VALIDATION PRINCIPALE
// ============================================

/**
 * Valide une réponse utilisateur contre une question
 * Version avancée avec fuzzy matching et options
 */
export function validateAnswer(
  userAnswer: string,
  question: Question | CustomQuestion,
  options: Partial<ValidationOptions> = {}
): ValidationResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Sanitize d'abord
  const cleanUserAnswer = sanitizeAnswer(userAnswer);
  const normalizedUserAnswer = normalizeAnswer(cleanUserAnswer, opts);
  
  // Réponse attendue
  const normalizedExpectedAnswer = normalizeAnswer(question.answer, opts);
  
  // Variantes
  const variants = 'variants' in question && question.variants
    ? question.variants
    : [question.answer];

  // 1. Test exact match sur variantes
  for (const variant of variants) {
    const normalizedVariant = normalizeAnswer(variant, opts);
    
    if (normalizedUserAnswer === normalizedVariant) {
      return {
        isCorrect: true,
        confidence: 1.0,
        matchedVariant: variant,
        normalizedUserAnswer,
        normalizedExpectedAnswer,
        method: 'exact'
      };
    }
  }

  // 2. Mode strict : arrêt ici si pas d'exact match
  if (opts.strictMode) {
    return {
      isCorrect: false,
      confidence: 0,
      normalizedUserAnswer,
      normalizedExpectedAnswer,
      method: 'exact',
      suggestions: variants.slice(0, 3)
    };
  }

  // 3. Fuzzy matching sur variantes (typos)
  if (opts.allowTypos) {
    for (const variant of variants) {
      const normalizedVariant = normalizeAnswer(variant, opts);
      
      if (isFuzzyMatch(normalizedUserAnswer, normalizedVariant, opts.maxTypoDistance!)) {
        const confidence = similarity(normalizedUserAnswer, normalizedVariant);
        
        return {
          isCorrect: true,
          confidence,
          matchedVariant: variant,
          normalizedUserAnswer,
          normalizedExpectedAnswer,
          method: 'fuzzy'
        };
      }
    }
  }

  // 4. Pas de match trouvé
  // Calcule suggestions (3 plus proches variantes)
  const suggestions = variants
    .map(v => ({
      variant: v,
      score: similarity(normalizedUserAnswer, normalizeAnswer(v, opts))
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.variant);

  return {
    isCorrect: false,
    confidence: 0,
    normalizedUserAnswer,
    normalizedExpectedAnswer,
    method: 'exact',
    suggestions
  };
}

// ============================================
// VALIDATION RAPIDE (Wrapper simple)
// ============================================

/**
 * Version simplifiée : retourne juste true/false
 */
export function isAnswerCorrect(
  userAnswer: string,
  question: Question | CustomQuestion,
  options?: Partial<ValidationOptions>
): boolean {
  const result = validateAnswer(userAnswer, question, options);
  return result.isCorrect;
}

/**
 * Validation stricte (pas de typos)
 */
export function isAnswerCorrectStrict(
  userAnswer: string,
  question: Question | CustomQuestion
): boolean {
  return validateAnswer(userAnswer, question, { strictMode: true }).isCorrect;
}

/**
 * Validation permissive (typos OK)
 */
export function isAnswerCorrectPermissive(
  userAnswer: string,
  question: Question | CustomQuestion
): boolean {
  return validateAnswer(userAnswer, question, {
    allowTypos: true,
    maxTypoDistance: 3,
    strictMode: false
  }).isCorrect;
}

// ============================================
// HELPERS
// ============================================

/**
 * Génère des suggestions intelligentes
 */
export function getSuggestions(
  userAnswer: string,
  possibleAnswers: string[],
  maxSuggestions: number = 3
): string[] {
  const normalized = normalizeAnswer(userAnswer);
  
  return possibleAnswers
    .map(answer => ({
      answer,
      score: similarity(normalized, normalizeAnswer(answer))
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSuggestions)
    .map(s => s.answer);
}

/**
 * Détecte si une réponse est vide ou invalide
 */
export function isValidAnswer(answer: string): boolean {
  const cleaned = answer.trim();
  return cleaned.length > 0 && cleaned.length <= 200;
}

/**
 * Score de confiance pour analytics
 */
export function getConfidenceScore(
  userAnswer: string,
  expectedAnswer: string
): number {
  const normalized1 = normalizeAnswer(userAnswer);
  const normalized2 = normalizeAnswer(expectedAnswer);
  return similarity(normalized1, normalized2);
}

// ============================================
// BATCH VALIDATION
// ============================================

/**
 * Valide plusieurs réponses en batch
 */
export function validateMultipleAnswers(
  answers: Array<{ userAnswer: string; question: Question | CustomQuestion }>,
  options?: Partial<ValidationOptions>
): ValidationResult[] {
  return answers.map(({ userAnswer, question }) =>
    validateAnswer(userAnswer, question, options)
  );
}

/**
 * Stats de validation pour analytics
 */
export interface ValidationStats {
  total: number;
  correct: number;
  incorrect: number;
  exactMatches: number;
  fuzzyMatches: number;
  averageConfidence: number;
}

export function calculateValidationStats(
  results: ValidationResult[]
): ValidationStats {
  const correct = results.filter(r => r.isCorrect);
  const exactMatches = correct.filter(r => r.method === 'exact');
  const fuzzyMatches = correct.filter(r => r.method === 'fuzzy');
  
  const avgConfidence = correct.length > 0
    ? correct.reduce((sum, r) => sum + r.confidence, 0) / correct.length
    : 0;

  return {
    total: results.length,
    correct: correct.length,
    incorrect: results.length - correct.length,
    exactMatches: exactMatches.length,
    fuzzyMatches: fuzzyMatches.length,
    averageConfidence: Math.round(avgConfidence * 100) / 100
  };
}
