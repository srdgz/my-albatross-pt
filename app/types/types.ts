export interface CurrencyState {
  list: Array<{
    code: string;
    currentRate: number;
    differenceBetweenYesterdayRate: number;
  }>;
  detail: {
    code: string;
    currentRate: number;
    differenceBetweenYesterdayRate: number;
    history: Array<{
      date: string;
      rate: number;
    }>;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
}

export const initialState: CurrencyState = {
  list: [],
  detail: null,
  status: "idle",
  detailStatus: "idle",
};

export interface CurrencyDetailModalProps {
  visible: boolean;
  onClose: () => void;
  currencyData: {
    code: string;
    history: Array<{ date: string; rate: number }>;
  } | null;
}

export interface UserState {
  id: number | null;
  name: string;
  username: string;
  email: string;
  birthDate: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export interface CustomButtonProps {
  onPress: () => void;
  title: string;
}

export interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  editable: boolean;
  placeholder: string;
}

export type IoniconName = "cash" | "cash-outline" | "person" | "person-outline";
