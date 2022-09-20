const ADDRESSES: { [key: string]: string; } = {
  STABLE_COIN_ADDRESS: "0x6A70C6c2a246B4ef170e8DD5eE3f2E965afAC265"
};

export const getAddress = (key: string) => {
  return ADDRESSES[key];
}