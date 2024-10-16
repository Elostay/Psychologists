interface ColorThemeState {
  value: string;
}

interface RootState {
  theme: ColorThemeState;
}

export const selectColorThemeValue = (state: any) =>
  state.theme?.value ?? 'orange';
