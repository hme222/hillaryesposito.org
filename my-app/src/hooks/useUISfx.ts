/**
 * Demo wiring for uisfx (https://uisfx.com) — a zero-dependency, synthesized
 * UI sound library. Not shipped as a decision yet; this is a taste-feedback
 * spike so Hillary can hear one pack ("zen") on a couple of real interactions
 * before deciding whether it belongs in the portfolio at all.
 *
 * Off by default (opt-in) for a first-time visitor, and persisted per-visitor
 * via localStorage so a returning visitor's choice survives a reload.
 * Nothing plays until sound is turned on.
 */
import { useCallback } from "react";
import { createUISFX, type CueName, type UISFXPlayer } from "uisfx";

const STORAGE_KEY = "portfolio:sfx";

let sharedPlayer: UISFXPlayer | null = null;

function readStoredEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return JSON.parse(raw)?.enabled === true;
  } catch {
    return false;
  }
}

function getPlayer(): UISFXPlayer {
  if (!sharedPlayer) {
    sharedPlayer = createUISFX({
      pack: "zen",
      volume: 0.45,
      enabled: readStoredEnabled(), // opt-in — silent for a first-time visitor,
      // but a returning visitor who turned it on keeps it on
      preferences: { key: STORAGE_KEY },
    });
  }
  return sharedPlayer;
}

export function useUISfx() {
  // AudioContext.resume() must be awaited before scheduling a sound — a
  // suspended context can silently drop a source started before the resume
  // promise settles. `unlock()` is cheap to call repeatedly (it short-circuits
  // immediately once the context is already running), so call it fresh
  // before every play — some browsers re-suspend an idle AudioContext after
  // a stretch of silence, and caching "we already unlocked once" meant those
  // later plays never actually resumed it again.
  const play = useCallback(async (cue: CueName) => {
    const player = getPlayer();
    if (!player.isEnabled()) return;
    await player.unlock();
    player.play(cue);
  }, []);

  const toggleEnabled = useCallback(() => {
    const player = getPlayer();
    const next = !player.isEnabled();
    player.setEnabled(next);
    if (next) {
      void player.unlock().then(() => player.play("toggle-on"));
    }
    return next;
  }, []);

  const isEnabled = useCallback(() => getPlayer().isEnabled(), []);

  return { play, toggleEnabled, isEnabled };
}
