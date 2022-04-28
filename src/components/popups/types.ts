export type BodyTypes = {
  msg: string
};

export type TitleTypes = {
  title: string
};

export type ItemsTypes = {
  name: string;
  status: string;
};

export interface ButtonProps {
  onPress: any,
  label: string,
}