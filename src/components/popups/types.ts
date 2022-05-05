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

export interface CertificateProps {
  certificate: Record<string, string>,
}

export interface CheckTypes {
  items: string[],
}

export interface CeritificateMissingTypes{
  text1: string,
  text2: string,
  textP: string

}
