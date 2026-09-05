export type QueryHistoryItem = {
  question: string;
  sql: string;
  timestamp: string;
};

const STORAGE_KEY = "querymind_history";

export function saveQueryToHistory(
  question: string,
  sql: string
): void {
  const existing = getQueryHistory();

  const newItem: QueryHistoryItem = {
    question,
    sql,
    timestamp: new Date().toLocaleString(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newItem, ...existing])
  );
}

export function getQueryHistory(): QueryHistoryItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as QueryHistoryItem[];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}