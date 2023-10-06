// See the Date-fns docs for the meaning of these formats:
// https://date-fns.org/v2.30.0/docs/format
export const TF_DATE_FORMATS = {
  parse: {
    // 2023-12-05
    dateInput: 'yyyy-MM-dd',
  },
  display: {
    // Sept 05, 2023
    dateInput: 'MMM dd, yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

export const MONTH_YEAR_FORMATS = {
  parse: {
    // 03/23
    dateInput: 'MM/yy',
  },
  display: {
    dateInput: 'MM/yy',
    monthYearLabel: 'MMM yy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yy',
  },
};
