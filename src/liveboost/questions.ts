/**
 * LiveBoost - Système de questions pour tirage au sort
 * Phase A : Questions pré-définies et validation
 */

// ============================================
// TYPES
// ============================================

export interface Question {
  id: number;
  question: string;
  answer: string;
  variants: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CustomQuestion {
  question: string;
  answer: string;
  variants?: string[]; // Auto-générés si non fournis
}

export interface QuestionValidationResult {
  isCorrect: boolean;
  matchedVariant?: string;
  normalizedUserAnswer: string;
  normalizedCorrectAnswer: string;
}

// ============================================
// QUESTIONS PRÉ-DÉFINIES (10)
// ============================================

export const PREDEFINED_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Combien font 2+2 ?",
    answer: "4",
    variants: ["4", "quatre"],
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Couleur du ciel ?",
    answer: "Bleu",
    variants: ["bleu", "blue", "Bleu", "BLEU"],
    difficulty: "easy"
  },
  {
    id: 3,
    question: "Jours dans une semaine ?",
    answer: "7",
    variants: ["7", "sept", "7 jours"],
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Capitale de France ?",
    answer: "Paris",
    variants: ["paris", "Paris", "PARIS"],
    difficulty: "medium"
  },
  {
    id: 5,
    question: "Pattes d'un chat ?",
    answer: "4",
    variants: ["4", "quatre"],
    difficulty: "easy"
  },
  {
    id: 6,
    question: "Couleur de la neige ?",
    answer: "Blanc",
    variants: ["blanc", "Blanc", "white", "blanche", "Blanche"],
    difficulty: "easy"
  },
  {
    id: 7,
    question: "Doigts sur une main ?",
    answer: "5",
    variants: ["5", "cinq"],
    difficulty: "easy"
  },
  {
    id: 8,
    question: "Roi de la jungle ?",
    answer: "Lion",
    variants: ["lion", "Lion", "LION", "le lion"],
    difficulty: "medium"
  },
  {
    id: 9,
    question: "Mois dans l'année ?",
    answer: "12",
    variants: ["12", "douze"],
    difficulty: "easy"
  },
  {
    id: 10,
    question: "Animal du lait ?",
    answer: "Vache",
    variants: ["vache", "Vache", "VACHE", "cow", "la vache"],
    difficulty: "medium"
  }
];

// ============================================
// UTILITAIRES
// ============================================

/**
 * Normalise une réponse pour la comparaison
 * - Trim espaces
 * - Lowercase
 * - Supprime accents
 * - Supprime articles (le, la, les, un, une)
 */
function normalizeAnswer(answer: string): string {
  return answer
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime accents
    .replace(/^(le|la|les|un|une|l')\s+/i, "") // Supprime articles
    .replace(/\s+/g, " "); // Multiple espaces → 1 espace
}

/**
 * Génère des variantes automatiques pour une réponse custom
 */
export function generateVariants(answer: string): string[] {
  const normalized = answer.trim();
  
  return [
    normalized,
    normalized.toLowerCase(),
    normalized.toUpperCase(),
    normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase()
  ];
}

// ============================================
// VALIDATION PRINCIPALE
// ============================================

/**
 * Valide la réponse d'un utilisateur contre une question
 * Gère les variantes et la normalisation
 */
export function validateAnswer(
  userAnswer: string,
  question: Question | CustomQuestion
): QuestionValidationResult {
  const normalizedUserAnswer = normalizeAnswer(userAnswer);
  const normalizedCorrectAnswer = normalizeAnswer(question.answer);
  
  // Variantes à tester
  let variants: string[];
  
  if ('variants' in question && question.variants) {
    variants = question.variants;
  } else {
    // Génère variantes auto pour custom questions
    variants = generateVariants(question.answer);
  }
  
  // Teste chaque variante
  for (const variant of variants) {
    const normalizedVariant = normalizeAnswer(variant);
    
    if (normalizedUserAnswer === normalizedVariant) {
      return {
        isCorrect: true,
        matchedVariant: variant,
        normalizedUserAnswer,
        normalizedCorrectAnswer
      };
    }
  }
  
  // Aucune variante ne correspond
  return {
    isCorrect: false,
    normalizedUserAnswer,
    normalizedCorrectAnswer
  };
}

// ============================================
// HELPERS
// ============================================

/**
 * Récupère une question par ID
 */
export function getQuestionById(id: number): Question | undefined {
  return PREDEFINED_QUESTIONS.find(q => q.id === id);
}

/**
 * Récupère une question aléatoire
 */
export function getRandomQuestion(): Question {
  const randomIndex = Math.floor(Math.random() * PREDEFINED_QUESTIONS.length);
  return PREDEFINED_QUESTIONS[randomIndex];
}

/**
 * Récupère questions par difficulté
 */
export function getQuestionsByDifficulty(
  difficulty: 'easy' | 'medium' | 'hard'
): Question[] {
  return PREDEFINED_QUESTIONS.filter(q => q.difficulty === difficulty);
}

/**
 * Crée une custom question avec variantes auto
 */
export function createCustomQuestion(
  question: string,
  answer: string,
  customVariants?: string[]
): CustomQuestion {
  return {
    question,
    answer,
    variants: customVariants || generateVariants(answer)
  };
}

// ============================================
// STATS & INFO
// ============================================

export const QUESTIONS_STATS = {
  total: PREDEFINED_QUESTIONS.length,
  easy: PREDEFINED_QUESTIONS.filter(q => q.difficulty === 'easy').length,
  medium: PREDEFINED_QUESTIONS.filter(q => q.difficulty === 'medium').length,
  hard: PREDEFINED_QUESTIONS.filter(q => q.difficulty === 'hard').length
};
