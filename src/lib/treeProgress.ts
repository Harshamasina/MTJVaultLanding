/**
 * Lightweight external store for tree spine progress.
 * TreeSpine writes which nodes are visible, FadeIn reads via useSyncExternalStore.
 * No React context needed — works across any component tree.
 */

type Listener = () => void;

let snapshot: Record<string, boolean> = {};
const listeners = new Set<Listener>();

export function getTreeSnapshot(): Record<string, boolean> {
    return snapshot;
}

const SERVER_SNAPSHOT: Record<string, boolean> = {};
export function getTreeServerSnapshot(): Record<string, boolean> {
    return SERVER_SNAPSHOT;
}

export function subscribeTree(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function updateTreeNodes(updates: Record<string, boolean>): void {
    let changed = false;
    for (const key in updates) {
        if (snapshot[key] !== updates[key]) {
            changed = true;
            break;
        }
    }
    if (changed) {
        snapshot = { ...snapshot, ...updates };
        listeners.forEach((l) => l());
    }
}
