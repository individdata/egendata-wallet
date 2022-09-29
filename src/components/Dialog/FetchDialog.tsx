import { ReactElement, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import BaseDialog from "./BaseDialog";

const checkboxListTexts = [
  "I give my consent for the Project OAK to handle and transfer this information once to BNP Paribas.",
  "I agree that this process removes the confidentiality of the information I choose to share with BNP Paribas.",
  "I have reviewed the information and confirm that no unwanted information is included in the transfer to Dummy.",
  "I have read and understand how Project OAK processes my personal data, as outlined in the Privacy policy.",
];

export default function FetchDialog() {
  const [state, setState] = useState("preview");
  const [checkboxes, setCheckbox] = useState(
    Object.fromEntries(
      checkboxListTexts.map((t, index) => [`box${index}`, false])
    )
  );
  const [buttonActive, setButtonActive] = useState(false);

  function handleCheckboxChange(evt) {
    const target = evt.target;
    const value = target.checked as boolean;
    const name = target.name as string;

    setCheckbox({ ...checkboxes, [name]: value });
  }

  const checkboxList = checkboxListTexts.map((t, index) => {
    return {
      text: t,
      checkbox: (
        <Checkbox onChange={handleCheckboxChange} name={`box${index}`} />
      ),
    };
  });

  useEffect(() => {
    setButtonActive(Object.values(checkboxes).every((v) => v));
  }, [checkboxes]);

  if (state === "consent") {
    return (
      <BaseDialog
        title="Consent document transfer"
        subtitle="You are about to fetch your Unemployment certificate from Arbetsförmedlingen."
        action="Consent and get your data"
        buttonActive={buttonActive}
        onContinueClick={() => console.log("Continue...")}
      >
      <DialogContent>
        <DialogContentText>
          <Typography>
            BNP Paribas will be provided information that you are registered
            as a job seeker in Arbetsförmedlingen and the date of such
            registration. For privacy reasons, BNP Paribas will not have
            access to any other information about you. You can withdraw your
            consent at any time which will terminate any further data
            transfer.
          </Typography>
          <Typography>
            When you are no longer registered as a job seeker in
            Arbetsförmedlingen, the transfer automatically terminates and
            you will need to provide an additional consent for the
            'job-seeker status' final date to be transfered to BNP Paribas.
          </Typography>
        </DialogContentText>
        <FormGroup>
          {checkboxList.map(({ text, checkbox }) => (
            <FormControlLabel control={checkbox} label={text} />
          ))}
        </FormGroup>
      </DialogContent>
    </BaseDialog>
    );
  }

  // state === 'preview'
  return (
    <BaseDialog
      title="Preview of your document transfer"
      subtitle="You are about to fetch your Unemployment certificate from Arbetsförmedlingen."
      action="Continue to get your data"
      onContinueClick={() => setState('consent')}
    >
      <Card>
        <CardContent>
          <Typography>
            Unmployment certificate Employment status
          </Typography>
          <Typography>Employment status start date</Typography>
          <Typography>Employment certificate request date</Typography>
        </CardContent>
      </Card>
      <DialogContent>
        <DialogContentText>
          Purpose of this transfer: To see and review the information before
          sharing it with the recipient.
        </DialogContentText>
      </DialogContent>
    </BaseDialog>
  );
}
