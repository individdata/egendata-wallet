import React, { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import LOCALES from '../../src/locales';

const withIntl = (content: ReactElement, lang: 'en' | 'sv' = 'en'): ReactElement => {
  return (
    <IntlProvider locale={lang} messages={LOCALES[lang]}>
      {content}
    </IntlProvider>
  );
};

export default withIntl;
