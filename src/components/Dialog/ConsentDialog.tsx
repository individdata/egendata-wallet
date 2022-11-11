import React, { EventHandler, ReactElement, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Checkbox,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import BaseDialog from './BaseDialog';
import { RequestState } from '../../types';

const checkboxListTexts = [
  'I give my consent for the Project OAK to handle and transfer this information once to BNP Paribas.',
  'I agree that this process removes the confidentiality of the information I choose to share with BNP Paribas.',
  'I have reviewed the information and confirm that no unwanted information is included in the transfer to Dummy.',
  'I have read and understand how Project OAK processes my personal data, as outlined in the Privacy policy.',
];

type ShareConsentDialogProps = {
  state: RequestState;
  error: boolean;
  onContinue: () => void;
  onConsent: () => void;
};

export default function ShareConsentDialog({ state, error, onContinue, onConsent }: ShareConsentDialogProps) {
  const [checkboxes, setCheckbox] = useState(
    Object.fromEntries(checkboxListTexts.map((t, index) => [`box${index}`, false])),
  );
  const [buttonActive, setButtonActive] = useState(false);

  function handleCheckboxChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { target } = evt;
    const value = target.checked as boolean;
    const name = target.name as string;

    setCheckbox({ ...checkboxes, [name]: value });
  }

  const checkboxList = checkboxListTexts.map((t, index) => ({
    index,
    text: t,
    checkbox: <Checkbox onChange={handleCheckboxChange} name={`box${index}`} />,
  }));

  useEffect(() => {
    setButtonActive(Object.values(checkboxes).every((v) => v));
  }, [checkboxes]);

  if (state === 'consent') {
    return (
      <BaseDialog
        title="Consent document transfer"
        subtitle="You are about to share your Unemployment certificate to BNP Paribas."
        action="Consent and get your data"
        buttonActive={buttonActive}
        onContinueClick={onConsent}
      >
        <DialogContent>
          <DialogContentText>
            <Typography>
              BNP Paribas will be provided information that you are registered as a job seeker in Arbetsförmedlingen and
              the date of such registration. For privacy reasons, BNP Paribas will not have access to any other
              information about you. You can withdraw your consent at any time which will terminate any further data
              transfer.
            </Typography>
            <Typography>
              When you are no longer registered as a job seeker in Arbetsförmedlingen, the transfer automatically
              terminates and you will need to provide an additional consent for the &apos;job-seeker status&apos; final
              date to be transfered to BNP Paribas.
            </Typography>
          </DialogContentText>
          <FormGroup>
            {checkboxList.map(({ index, text, checkbox }) => (
              <FormControlLabel key={index} control={checkbox} label={text} />
            ))}
          </FormGroup>
        </DialogContent>
      </BaseDialog>
    );
  }

  if (state === 'preview') {
    return (
      <BaseDialog
        title="Review your document transfer"
        subtitle="Review your Unemployment certificate data to be shareed with BNP Paribas."
        action="Continue to get your data"
        onContinueClick={onContinue}
      >
        <Card>
          <CardContent>
            <Typography paddingBottom={2} color="primary">
              Unemployment certificate
            </Typography>
            <Typography>
              Employment status:{' '}
              <Typography component="span" color="primary">
                Unmployment
              </Typography>
            </Typography>
            <Typography>
              Employment status start date:{' '}
              <Typography component="span" color="primary">
                {new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </Typography>
            </Typography>
            <Typography>
              Employment certificate request date:{' '}
              <Typography component="span" color="primary">
                {new Date(Date.now()).toLocaleDateString()}
              </Typography>
            </Typography>
          </CardContent>
        </Card>
        <DialogContent>
          <DialogContentText>
            Purpose of this transfer: BNP Paribas will be provided information that you are registered as a job seeker
            in Arbetsförmedlingen and the date of the registration.
          </DialogContentText>
        </DialogContent>
      </BaseDialog>
    );
  }
  return <></>;
}
