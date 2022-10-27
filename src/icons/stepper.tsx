/* eslint max-len: ["error", { "ignoreStrings": true }] */
import React from 'react';
import { createSvgIcon } from '@mui/material';

export const StepOneIcon = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="11.25" fill="#FFFFFF" fillOpacity="0.2" />
    <path
      d="m 13.44285,17.25 h -1.728525 v -6.892125 c 0,-0.229425 0.0025,-0.458925 0.0073,-0.688425 0.0049,-0.2295 0.0098,-0.454125 0.01463,-0.673875 0.0098,-0.219675 0.02197,-0.429675 0.03668,-0.62985 -0.1026,0.112275 -0.2295,0.234375 -0.38085,0.366225 -0.14655,0.13185 -0.302775,0.268575 -0.46875,0.410175 L 9.69285,10.1235 8.828625,9.03225 12.00735,6.541995 h 1.4355 z"
      fill="#FFFFFF"
    />
  </>,
  'One',
);

export const StepOneActiveIcon = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="11.25" fill="#65D36E" />
    <path
      d="m 13.44285,17.25 h -1.728525 v -6.892125 c 0,-0.229425 0.0025,-0.458925 0.0073,-0.688425 0.0049,-0.2295 0.0098,-0.454125 0.01463,-0.673875 0.0098,-0.219675 0.02197,-0.429675 0.03668,-0.62985 -0.1026,0.112275 -0.2295,0.234375 -0.38085,0.366225 -0.14655,0.13185 -0.302775,0.268575 -0.46875,0.410175 L 9.69285,10.1235 8.828625,9.03225 12.00735,6.541995 h 1.4355 z"
      fill="#2D43A5"
    />
  </>,
  'OneActive',
);

export const StepTwoIcon = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="12" fill="#FFFFFF" fillOpacity="0.2" />
    <path
      d="m 15.63285,17.25 h -7.251 v -1.296375 l 2.7759,-2.8125 c 0.537075,-0.5469 0.978975,-1.01805 1.325625,-1.4136 0.346725,-0.40035 0.603075,-0.7788 0.76905,-1.135275 0.170925,-0.3564 0.25635,-0.7446 0.25635,-1.164525 C 13.508775,8.91015 13.3599,8.51955 13.062,8.25585 12.764175,7.987275 12.3711,7.853025 11.88285,7.853025 c -0.463875,0 -0.893625,0.092775 -1.2891,0.278325 -0.3906,0.180675 -0.7959,0.439425 -1.215825,0.7764 L 8.433075,7.772475 c 0.2979,-0.25395 0.6153,-0.4858575 0.9522,-0.6958125 C 9.72705,6.8667 10.1079,6.70068 10.527825,6.57861 10.94775,6.4516575 11.42625,6.388185 11.9634,6.388185 c 0.678675,0 1.26465,0.12207 1.757775,0.36621 0.4932,0.2392575 0.871575,0.5737275 1.135275,1.003455 0.268575,0.429675 0.402825,0.93015 0.402825,1.501425 0,0.57615 -0.11475,1.108425 -0.34425,1.596675 -0.2295,0.488325 -0.55665,0.9717 -0.98145,1.4502 -0.4248,0.473625 -0.93015,0.9888 -1.516125,1.54545 l -1.853025,1.809075 v 0.08055 h 5.068425 z"
      fill="#FFFFFF"
    />
  </>,
  'Two',
);

export const StepTwoActiveIcon = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="12" fill="#65D36E" />
    <path
      d="m 15.63285,17.25 h -7.251 v -1.296375 l 2.7759,-2.8125 c 0.537075,-0.5469 0.978975,-1.01805 1.325625,-1.4136 0.346725,-0.40035 0.603075,-0.7788 0.76905,-1.135275 0.170925,-0.3564 0.25635,-0.7446 0.25635,-1.164525 C 13.508775,8.91015 13.3599,8.51955 13.062,8.25585 12.764175,7.987275 12.3711,7.853025 11.88285,7.853025 c -0.463875,0 -0.893625,0.092775 -1.2891,0.278325 -0.3906,0.180675 -0.7959,0.439425 -1.215825,0.7764 L 8.433075,7.772475 c 0.2979,-0.25395 0.6153,-0.4858575 0.9522,-0.6958125 C 9.72705,6.8667 10.1079,6.70068 10.527825,6.57861 10.94775,6.4516575 11.42625,6.388185 11.9634,6.388185 c 0.678675,0 1.26465,0.12207 1.757775,0.36621 0.4932,0.2392575 0.871575,0.5737275 1.135275,1.003455 0.268575,0.429675 0.402825,0.93015 0.402825,1.501425 0,0.57615 -0.11475,1.108425 -0.34425,1.596675 -0.2295,0.488325 -0.55665,0.9717 -0.98145,1.4502 -0.4248,0.473625 -0.93015,0.9888 -1.516125,1.54545 l -1.853025,1.809075 v 0.08055 h 5.068425 z"
      fill="#2D43A5"
    />
  </>,
  'TwoActive',
);

export const CheckIcon = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="11.25" stroke="#65D36E" strokeWidth="1.5" fill="none" />
    <path
      d="M 17.032425,8.4075 C 16.96275,8.337225 16.8798,8.281425 16.788375,8.243325 16.697025,8.205225 16.599,8.18565 16.499925,8.18565 c -0.099,0 -0.197025,0.019575 -0.288375,0.057675 -0.09142,0.0381 -0.174375,0.0939 -0.24405,0.164175 L 10.38,14.0025 8.032425,11.6475 C 7.96005,11.577525 7.874625,11.52255 7.78095,11.48565 7.68735,11.44875 7.587375,11.430675 7.4867025,11.4324 7.3860675,11.4341 7.28676,11.45572 7.19445,11.49585 c -0.092302,0.04005 -0.1758075,0.09802 -0.2457375,0.1704 -0.06993,0.07238 -0.1249125,0.1578 -0.16182,0.251475 -0.0369,0.09367 -0.054998,0.19365 -0.053258,0.2943 0.00174,0.100575 0.023288,0.19995 0.063405,0.2922 0.040125,0.09233 0.098033,0.1758 0.1704225,0.245775 L 9.8475,15.63 c 0.069675,0.07027 0.152625,0.126075 0.24405,0.164175 0.09135,0.03803 0.189375,0.05768 0.28845,0.05768 0.099,0 0.197025,-0.01965 0.288375,-0.05768 0.09143,-0.0381 0.174375,-0.0939 0.244125,-0.164175 l 6.119925,-6.12 c 0.0762,-0.070275 0.13695,-0.155475 0.1785,-0.25035 0.04155,-0.094875 0.063,-0.197325 0.063,-0.3009 0,-0.103575 -0.02145,-0.206025 -0.063,-0.3009 -0.04155,-0.094875 -0.1023,-0.18015 -0.1785,-0.25035 z"
      fill="#65D36E"
    />
  </>,
  'Checkmark',
);

export function Arrow({ color = 'rgba(255, 255, 255, 0.2' }: { color?: string }) {
  return (
    <svg width="173" height="16" viewBox="0 0 173 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.03169 9.59978L167.557 9.59978L163.881 13.2602C163.732 13.4092 163.614 13.5861 163.533 13.7808C163.452 13.9756 163.411 14.1843 163.411 14.395C163.411 14.6058 163.452 14.8145 163.533 15.0092C163.614 15.204 163.732 15.3809 163.881 15.5299C164.03 15.679 164.207 15.7972 164.402 15.8778C164.596 15.9585 164.805 16 165.016 16C165.227 16 165.435 15.9585 165.63 15.8778C165.825 15.7972 166.002 15.679 166.151 15.5299L172.544 9.13624C172.69 8.98423 172.804 8.80497 172.88 8.60876C173.04 8.21961 173.04 7.78312 172.88 7.39396C172.804 7.19776 172.69 7.0185 172.544 6.86649L166.151 0.472811C166.002 0.322994 165.825 0.204078 165.631 0.122928C165.436 0.0417779 165.227 -6.79547e-07 165.016 -6.97995e-07C164.805 -7.16442e-07 164.596 0.0417778 164.401 0.122928C164.206 0.204078 164.03 0.322993 163.881 0.472811C163.731 0.621405 163.612 0.798189 163.531 0.992972C163.45 1.18775 163.408 1.39668 163.408 1.60769C163.408 1.8187 163.45 2.02762 163.531 2.2224C163.612 2.41718 163.731 2.59397 163.881 2.74256L167.557 6.40294L2.03169 6.40294C1.60777 6.40294 1.20119 6.57135 0.901429 6.87111C0.60167 7.17087 0.433274 7.57743 0.433274 8.00136C0.433274 8.42529 0.60167 8.83185 0.901429 9.13161C1.20119 9.43138 1.60777 9.59978 2.03169 9.59978Z"
        fill={color}
      />
    </svg>
  );
}
