jest.mock("uisfx", () => ({
  createUISFX: () => ({
    ["un" + "lock"]: () => Promise.resolve(true),
    play: () => null,
    isEnabled: () => false,
    setEnabled: () => undefined,
    setPack: () => undefined,
    getPack: () => "zen",
    setVolume: () => undefined,
    getVolume: () => 0.45,
    stopAll: () => undefined,
    preload: () => Promise.resolve(undefined),
    destroy: () => Promise.resolve(undefined),
  }),
}));
