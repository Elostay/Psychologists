interface RootState {
  colorTheme: { value: string };
}

export const selectColorThemeValue = (state: RootState) =>
  state.colorTheme.value;
