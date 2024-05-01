export interface IModal {
  isOpen: boolean;
  onClose: () => void;
  login?: boolean;
  registration?: boolean;
}
