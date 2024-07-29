/*
 * Marketplace specific configuration.
 *
 * Every filter needs to have following keys:
 * - id:     Unique id of the filter.
 * - label:  The default label of the filter.
 * - type:   String that represents one of the existing filter components:
 *           BookingDateRangeFilter, KeywordFilter, PriceFilter,
 *           SelectSingleFilter, SelectMultipleFilter.
 * - group:  Is this 'primary' or 'secondary' filter?
 *           Primary filters are visible on desktop layout by default.
 *           Secondary filters are behind "More filters" button.
 *           Read more from src/containers/SearchPage/README.md
 * - queryParamNames: Describes parameters to be used with queries
 *                    (e.g. 'price' or 'pub_amenities'). Most of these are
 *                    the same between webapp URLs and API query params.
 *                    You can't change 'dates', 'price', or 'keywords'
 *                    since those filters are fixed to a specific attribute.
 * - config: Extra configuration that the filter component needs.
 *
 * Note 1: Labels could be tied to translation file
 *         by importing FormattedMessage:
 *         <FormattedMessage id="some.translation.key.here" />
 *
 * Note 2: If you need to add new custom filter components,
 *         you need to take those into use in:
 *         src/containers/SearchPage/FilterComponent.js
 *
 * Note 3: If you just want to create more enum filters
 *         (i.e. SelectSingleFilter, SelectMultipleFilter),
 *         you can just add more configurations with those filter types
 *         and tie them with correct extended data key
 *         (i.e. pub_<key> or meta_<key>).
 */
import suneCurrencyImg from '../src/assets/sune-coin-icon.svg';
import suneCurrencyImgBlack from '../src/assets/sune-coin-icon-black.svg';

export const suneCurrencySymbol = suneCurrencyImg;
export const suneCurrencySymbolBlack = suneCurrencyImgBlack;
export const condition = [
  {
    value: 'new',
    label: 'EditListingDescriptionForm.productNew',
  },
  {
    value: 'brandNew',
    label: 'EditListingDescriptionForm.productBrandNew',
  },
  {
    value: 'secondHand',
    label: 'EditListingDescriptionForm.productSecondHandGoodCondition',
  },
];
export const inboxOptions = [
  {
    label: 'What You Search',
    value: 'orders',
  },
  {
    label: 'What You Offer',
    value: 'sales',
  },
];
export const plans = [
  {
    id: 'sune-plan-1',
    label: 'Plans.MonthlyPlan',
    planId: 'basic-plan',
    description: 'Plans.MonthlyPlanDescription',
  },
  {
    id: 'sune-plan-2',
    label: 'Plans.YearlyPlan',
    planId: 'premium-plan',
    description: 'Plans.YearlyPlanDescription',
  },
];
export const categoryOptions = [
  { label: 'categoryOptions.artsDes', value: 'arts', key: 'arts' },
  { label: 'categoryOptions.foodServ', value: 'foodService', key: 'foodService' },
  { label: 'categoryOptions.healthWell', value: 'HWandBeauty', key: 'HWandBeauty' },
  { label: 'categoryOptions.healthSportAndWellBeing', value: 'healthSportAndWellBeing', key: 'healthSportAndWellBeing' },
  { label: 'categoryOptions.itPhoto', value: 'ItPhoto', key: 'ItPhoto' },
  { label: 'categoryOptions.houseGarden', value: 'housePets', key: 'housePets' },
  { label: 'categoryOptions.moving', value: 'mvTransport', key: 'mvTransport' },
  { label: 'categoryOptions.sportsHobbies', value: 'sHandEvents', key: 'sHandEvents' },
  { label: 'categoryOptions.teaching', value: 'teaching', key: 'teaching' },
  { label: 'categoryOptions.technicians', value: 'tAProf', key: 'tAProf' },
  { label: 'categoryOptions.other', value: 'other', key: 'other' },
  { label: 'categoryOptions.craftsmen', value: 'craftsmen', key: 'craftsmen' },
  { label: 'categoryOptions.consultingAndCoaching', value: 'consultingAndCoaching', key: 'consultingAndCoaching' },
];
export const countries = [
  {
    label: 'Afghanistan',
    key: 'AF',
    value: 'AF',
  },
  {
    label: 'Åland Islands',
    key: 'AX',
    value: 'AX',
  },
  {
    label: 'Albania',
    key: 'AL',
    value: 'AL',
  },
  {
    label: 'Algeria',
    key: 'DZ',
    value: 'DZ',
  },
  {
    label: 'American Samoa',
    key: 'AS',
    value: 'AS',
  },
  {
    label: 'AndorrA',
    key: 'AD',
    value: 'AD',
  },
  {
    label: 'Angola',
    key: 'AO',
    value: 'AO',
  },
  {
    label: 'Anguilla',
    key: 'AI',
    value: 'AI',
  },
  {
    label: 'Antarctica',
    key: 'AQ',
    value: 'AQ',
  },
  {
    label: 'Antigua and Barbuda',
    key: 'AG',
    value: 'AG',
  },
  {
    label: 'Argentina',
    key: 'AR',
    value: 'AR',
  },
  {
    label: 'Armenia',
    key: 'AM',
    value: 'AM',
  },
  {
    label: 'Aruba',
    key: 'AW',
    value: 'AW',
  },
  {
    label: 'Australia',
    key: 'AU',
    value: 'AU',
  },
  {
    label: 'Austria',
    key: 'AT',
    value: 'AT',
  },
  {
    label: 'Azerbaijan',
    key: 'AZ',
    value: 'AZ',
  },
  {
    label: 'Bahamas',
    key: 'BS',
    value: 'BS',
  },
  {
    label: 'Bahrain',
    key: 'BH',
    value: 'BH',
  },
  {
    label: 'Bangladesh',
    key: 'BD',
    value: 'BD',
  },
  {
    label: 'Barbados',
    key: 'BB',
    value: 'BB',
  },
  {
    label: 'Belarus',
    key: 'BY',
    value: 'BY',
  },
  {
    label: 'Belgium',
    key: 'BE',
    value: 'BE',
  },
  {
    label: 'Belize',
    key: 'BZ',
    value: 'BZ',
  },
  {
    label: 'Benin',
    key: 'BJ',
    value: 'BJ',
  },
  {
    label: 'Bermuda',
    key: 'BM',
    value: 'BM',
  },
  {
    label: 'Bhutan',
    key: 'BT',
    value: 'BT',
  },
  {
    label: 'Bolivia',
    key: 'BO',
    value: 'BO',
  },
  {
    label: 'Bosnia and Herzegovina',
    key: 'BA',
    value: 'BA',
  },
  {
    label: 'Botswana',
    key: 'BW',
    value: 'BW',
  },
  {
    label: 'Bouvet Island',
    key: 'BV',
    value: 'BV',
  },
  {
    label: 'Brazil',
    key: 'BR',
    value: 'BR',
  },
  {
    label: 'British Indian Ocean Territory',
    key: 'IO',
    value: 'IO',
  },
  {
    label: 'Brunei Darussalam',
    key: 'BN',
    value: 'BN',
  },
  {
    label: 'Bulgaria',
    key: 'BG',
    value: 'BG',
  },
  {
    label: 'Burkina Faso',
    key: 'BF',
    value: 'BF',
  },
  {
    label: 'Burundi',
    key: 'BI',
    value: 'BI',
  },
  {
    label: 'Cambodia',
    key: 'KH',
    value: 'KH',
  },
  {
    label: 'Cameroon',
    key: 'CM',
    value: 'CM',
  },
  {
    label: 'Canada',
    key: 'CA',
    value: 'CA',
  },
  {
    label: 'Cape Verde',
    key: 'CV',
    value: 'CV',
  },
  {
    label: 'Cayman Islands',
    key: 'KY',
    value: 'KY',
  },
  {
    label: 'Central African Republic',
    key: 'CF',
    value: 'CF',
  },
  {
    label: 'Chad',
    key: 'TD',
    value: 'TD',
  },
  {
    label: 'Chile',
    key: 'CL',
    value: 'CL',
  },
  {
    label: 'China',
    key: 'CN',
    value: 'CN',
  },
  {
    label: 'Christmas Island',
    key: 'CX',
    value: 'CX',
  },
  {
    label: 'Cocos (Keeling) Islands',
    key: 'CC',
    value: 'CC',
  },
  {
    label: 'Colombia',
    key: 'CO',
    value: 'CO',
  },
  {
    label: 'Comoros',
    key: 'KM',
    value: 'KM',
  },
  {
    label: 'Congo',
    key: 'CG',
    value: 'CG',
  },
  {
    label: 'Congo, The Democratic Republic of the',
    key: 'CD',
    value: 'CD',
  },
  {
    label: 'Cook Islands',
    key: 'CK',
    value: 'CK',
  },
  {
    label: 'Costa Rica',
    key: 'CR',
    value: 'CR',
  },
  {
    label: "Cote D'Ivoire",
    key: 'CI',
    value: 'CI',
  },
  {
    label: 'Croatia',
    key: 'HR',
    value: 'HR',
  },
  {
    label: 'Cuba',
    key: 'CU',
    value: 'CU',
  },
  {
    label: 'Cyprus',
    key: 'CY',
    value: 'CY',
  },
  {
    label: 'Czech Republic',
    key: 'CZ',
    value: 'CZ',
  },
  {
    label: 'Denmark',
    key: 'DK',
    value: 'DK',
  },
  {
    label: 'Djibouti',
    key: 'DJ',
    value: 'DJ',
  },
  {
    label: 'Dominica',
    key: 'DM',
    value: 'DM',
  },
  {
    label: 'Dominican Republic',
    key: 'DO',
    value: 'DO',
  },
  {
    label: 'Ecuador',
    key: 'EC',
    value: 'EC',
  },
  {
    label: 'Egypt',
    key: 'EG',
    value: 'EG',
  },
  {
    label: 'El Salvador',
    key: 'SV',
    value: 'SV',
  },
  {
    label: 'Equatorial Guinea',
    key: 'GQ',
    value: 'GQ',
  },
  {
    label: 'Eritrea',
    key: 'ER',
    value: 'ER',
  },
  {
    label: 'Estonia',
    key: 'EE',
    value: 'EE',
  },
  {
    label: 'Ethiopia',
    key: 'ET',
    value: 'ET',
  },
  {
    label: 'Falkland Islands (Malvinas)',
    key: 'FK',
    value: 'FK',
  },
  {
    label: 'Faroe Islands',
    key: 'FO',
    value: 'FO',
  },
  {
    label: 'Fiji',
    key: 'FJ',
    value: 'FJ',
  },
  {
    label: 'Finland',
    key: 'FI',
    value: 'FI',
  },
  {
    label: 'France',
    key: 'FR',
    value: 'FR',
  },
  {
    label: 'French Guiana',
    key: 'GF',
    value: 'GF',
  },
  {
    label: 'French Polynesia',
    key: 'PF',
    value: 'PF',
  },
  {
    label: 'French Southern Territories',
    key: 'TF',
    value: 'TF',
  },
  {
    label: 'Gabon',
    key: 'GA',
    value: 'GA',
  },
  {
    label: 'Gambia',
    key: 'GM',
    value: 'GM',
  },
  {
    label: 'Georgia',
    key: 'GE',
    value: 'GE',
  },
  {
    label: 'Germany',
    key: 'DE',
    value: 'DE',
  },
  {
    label: 'Ghana',
    key: 'GH',
    value: 'GH',
  },
  {
    label: 'Gibraltar',
    key: 'GI',
    value: 'GI',
  },
  {
    label: 'Greece',
    key: 'GR',
    value: 'GR',
  },
  {
    label: 'Greenland',
    key: 'GL',
    value: 'GL',
  },
  {
    label: 'Grenada',
    key: 'GD',
    value: 'GD',
  },
  {
    label: 'Guadeloupe',
    key: 'GP',
    value: 'GP',
  },
  {
    label: 'Guam',
    key: 'GU',
    value: 'GU',
  },
  {
    label: 'Guatemala',
    key: 'GT',
    value: 'GT',
  },
  {
    label: 'Guernsey',
    key: 'GG',
    value: 'GG',
  },
  {
    label: 'Guinea',
    key: 'GN',
    value: 'GN',
  },
  {
    label: 'Guinea-Bissau',
    key: 'GW',
    value: 'GW',
  },
  {
    label: 'Guyana',
    key: 'GY',
    value: 'GY',
  },
  {
    label: 'Haiti',
    key: 'HT',
    value: 'HT',
  },
  {
    label: 'Heard Island and Mcdonald Islands',
    key: 'HM',
    value: 'HM',
  },
  {
    label: 'Holy See (Vatican City State)',
    key: 'VA',
    value: 'VA',
  },
  {
    label: 'Honduras',
    key: 'HN',
    value: 'HN',
  },
  {
    label: 'Hong Kong',
    key: 'HK',
    value: 'HK',
  },
  {
    label: 'Hungary',
    key: 'HU',
    value: 'HU',
  },
  {
    label: 'Iceland',
    key: 'IS',
    value: 'IS',
  },
  {
    label: 'India',
    key: 'IN',
    value: 'IN',
  },
  {
    label: 'Indonesia',
    key: 'ID',
    value: 'ID',
  },
  {
    label: 'Iran, Islamic Republic Of',
    key: 'IR',
    value: 'IR',
  },
  {
    label: 'Iraq',
    key: 'IQ',
    value: 'IQ',
  },
  {
    label: 'Ireland',
    key: 'IE',
    value: 'IE',
  },
  {
    label: 'Isle of Man',
    key: 'IM',
    value: 'IM',
  },
  {
    label: 'Israel',
    key: 'IL',
    value: 'IL',
  },
  {
    label: 'Italy',
    key: 'IT',
    value: 'IT',
  },
  {
    label: 'Jamaica',
    key: 'JM',
    value: 'JM',
  },
  {
    label: 'Japan',
    key: 'JP',
    value: 'JP',
  },
  {
    label: 'Jersey',
    key: 'JE',
    value: 'JE',
  },
  {
    label: 'Jordan',
    key: 'JO',
    value: 'JO',
  },
  {
    label: 'Kazakhstan',
    key: 'KZ',
    value: 'KZ',
  },
  {
    label: 'Kenya',
    key: 'KE',
    value: 'KE',
  },
  {
    label: 'Kiribati',
    key: 'KI',
    value: 'KI',
  },
  {
    label: "Korea, Democratic People'S Republic of",
    key: 'KP',
    value: 'KP',
  },
  {
    label: 'Korea, Republic of',
    key: 'KR',
    value: 'KR',
  },
  {
    label: 'Kuwait',
    key: 'KW',
    value: 'KW',
  },
  {
    label: 'Kyrgyzstan',
    key: 'KG',
    value: 'KG',
  },
  {
    label: "Lao People'S Democratic Republic",
    key: 'LA',
    value: 'LA',
  },
  {
    label: 'Latvia',
    key: 'LV',
    value: 'LV',
  },
  {
    label: 'Lebanon',
    key: 'LB',
    value: 'LB',
  },
  {
    label: 'Lesotho',
    key: 'LS',
    value: 'LS',
  },
  {
    label: 'Liberia',
    key: 'LR',
    value: 'LR',
  },
  {
    label: 'Libyan Arab Jamahiriya',
    key: 'LY',
    value: 'LY',
  },
  {
    label: 'Liechtenstein',
    key: 'LI',
    value: 'LI',
  },
  {
    label: 'Lithuania',
    key: 'LT',
    value: 'LT',
  },
  {
    label: 'Luxembourg',
    key: 'LU',
    value: 'LU',
  },
  {
    label: 'Macao',
    key: 'MO',
    value: 'MO',
  },
  {
    label: 'Macedonia, The Former Yugoslav Republic of',
    key: 'MK',
    value: 'MK',
  },
  {
    label: 'Madagascar',
    key: 'MG',
    value: 'MG',
  },
  {
    label: 'Malawi',
    key: 'MW',
    value: 'MW',
  },
  {
    label: 'Malaysia',
    key: 'MY',
    value: 'MY',
  },
  {
    label: 'Maldives',
    key: 'MV',
    value: 'MV',
  },
  {
    label: 'Mali',
    key: 'ML',
    value: 'ML',
  },
  {
    label: 'Malta',
    key: 'MT',
    value: 'MT',
  },
  {
    label: 'Marshall Islands',
    key: 'MH',
    value: 'MH',
  },
  {
    label: 'Martinique',
    key: 'MQ',
    value: 'MQ',
  },
  {
    label: 'Mauritania',
    key: 'MR',
    value: 'MR',
  },
  {
    label: 'Mauritius',
    key: 'MU',
    value: 'MU',
  },
  {
    label: 'Mayotte',
    key: 'YT',
    value: 'YT',
  },
  {
    label: 'Mexico',
    key: 'MX',
    value: 'MX',
  },
  {
    label: 'Micronesia, Federated States of',
    key: 'FM',
    value: 'FM',
  },
  {
    label: 'Moldova, Republic of',
    key: 'MD',
    value: 'MD',
  },
  {
    label: 'Monaco',
    key: 'MC',
    value: 'MC',
  },
  {
    label: 'Mongolia',
    key: 'MN',
    value: 'MN',
  },
  {
    label: 'Montserrat',
    key: 'MS',
    value: 'MS',
  },
  {
    label: 'Morocco',
    key: 'MA',
    value: 'MA',
  },
  {
    label: 'Mozambique',
    key: 'MZ',
    value: 'MZ',
  },
  {
    label: 'Myanmar',
    key: 'MM',
    value: 'MM',
  },
  {
    label: 'Namibia',
    key: 'NA',
    value: 'NA',
  },
  {
    label: 'Nauru',
    key: 'NR',
    value: 'NR',
  },
  {
    label: 'Nepal',
    key: 'NP',
    value: 'NP',
  },
  {
    label: 'Netherlands',
    key: 'NL',
    value: 'NL',
  },
  {
    label: 'Netherlands Antilles',
    key: 'AN',
    value: 'AN',
  },
  {
    label: 'New Caledonia',
    key: 'NC',
    value: 'NC',
  },
  {
    label: 'New Zealand',
    key: 'NZ',
    value: 'NZ',
  },
  {
    label: 'Nicaragua',
    key: 'NI',
    value: 'NI',
  },
  {
    label: 'Niger',
    key: 'NE',
    value: 'NE',
  },
  {
    label: 'Nigeria',
    key: 'NG',
    value: 'NG',
  },
  {
    label: 'Niue',
    key: 'NU',
    value: 'NU',
  },
  {
    label: 'Norfolk Island',
    key: 'NF',
    value: 'NF',
  },
  {
    label: 'Northern Mariana Islands',
    key: 'MP',
    value: 'MP',
  },
  {
    label: 'Norway',
    key: 'NO',
    value: 'NO',
  },
  {
    label: 'Oman',
    key: 'OM',
    value: 'OM',
  },
  {
    label: 'Pakistan',
    key: 'PK',
    value: 'PK',
  },
  {
    label: 'Palau',
    key: 'PW',
    value: 'PW',
  },
  {
    label: 'Palestinian Territory, Occupied',
    key: 'PS',
    value: 'PS',
  },
  {
    label: 'Panama',
    key: 'PA',
    value: 'PA',
  },
  {
    label: 'Papua New Guinea',
    key: 'PG',
    value: 'PG',
  },
  {
    label: 'Paraguay',
    key: 'PY',
    value: 'PY',
  },
  {
    label: 'Peru',
    key: 'PE',
    value: 'PE',
  },
  {
    label: 'Philippines',
    key: 'PH',
    value: 'PH',
  },
  {
    label: 'Pitcairn',
    key: 'PN',
    value: 'PN',
  },
  {
    label: 'Poland',
    key: 'PL',
    value: 'PL',
  },
  {
    label: 'Portugal',
    key: 'PT',
    value: 'PT',
  },
  {
    label: 'Puerto Rico',
    key: 'PR',
    value: 'PR',
  },
  {
    label: 'Qatar',
    key: 'QA',
    value: 'QA',
  },
  {
    label: 'Reunion',
    key: 'RE',
    value: 'RE',
  },
  {
    label: 'Romania',
    key: 'RO',
    value: 'RO',
  },
  {
    label: 'Russian Federation',
    key: 'RU',
    value: 'RU',
  },
  {
    label: 'RWANDA',
    key: 'RW',
    value: 'RW',
  },
  {
    label: 'Saint Helena',
    key: 'SH',
    value: 'SH',
  },
  {
    label: 'Saint Kitts and Nevis',
    key: 'KN',
    value: 'KN',
  },
  {
    label: 'Saint Lucia',
    key: 'LC',
    value: 'LC',
  },
  {
    label: 'Saint Pierre and Miquelon',
    key: 'PM',
    value: 'PM',
  },
  {
    label: 'Saint Vincent and the Grenadines',
    key: 'VC',
    value: 'VC',
  },
  {
    label: 'Samoa',
    key: 'WS',
    value: 'WS',
  },
  {
    label: 'San Marino',
    key: 'SM',
    value: 'SM',
  },
  {
    label: 'Sao Tome and Principe',
    key: 'ST',
    value: 'ST',
  },
  {
    label: 'Saudi Arabia',
    key: 'SA',
    value: 'SA',
  },
  {
    label: 'Senegal',
    key: 'SN',
    value: 'SN',
  },
  {
    label: 'Serbia and Montenegro',
    key: 'RS',
    value: 'RS',
  },
  {
    label: 'Seychelles',
    key: 'SC',
    value: 'SC',
  },
  {
    label: 'Sierra Leone',
    key: 'SL',
    value: 'SL',
  },
  {
    label: 'Singapore',
    key: 'SG',
    value: 'SG',
  },
  {
    label: 'Slovakia',
    key: 'SK',
    value: 'SK',
  },
  {
    label: 'Slovenia',
    key: 'SI',
    value: 'SI',
  },
  {
    label: 'Solomon Islands',
    key: 'SB',
    value: 'SB',
  },
  {
    label: 'Somalia',
    key: 'SO',
    value: 'SO',
  },
  {
    label: 'South Africa',
    key: 'ZA',
    value: 'ZA',
  },
  {
    label: 'South Georgia and the South Sandwich Islands',
    key: 'GS',
    value: 'GS',
  },
  {
    label: 'Spain',
    key: 'ES',
    value: 'ES',
  },
  {
    label: 'Sri Lanka',
    key: 'LK',
    value: 'LK',
  },
  {
    label: 'Sudan',
    key: 'SD',
    value: 'SD',
  },
  {
    label: 'Suriname',
    key: 'SR',
    value: 'SR',
  },
  {
    label: 'Svalbard and Jan Mayen',
    key: 'SJ',
    value: 'SJ',
  },
  {
    label: 'Swaziland',
    key: 'SZ',
    value: 'SZ',
  },
  {
    label: 'Sweden',
    key: 'SE',
    value: 'SE',
  },
  {
    label: 'Switzerland',
    key: 'CH',
    value: 'CH',
  },
  {
    label: 'Syrian Arab Republic',
    key: 'SY',
    value: 'SY',
  },
  {
    label: 'Taiwan, Province of China',
    key: 'TW',
    value: 'TW',
  },
  {
    label: 'Tajikistan',
    key: 'TJ',
    value: 'TJ',
  },
  {
    label: 'Tanzania, United Republic of',
    key: 'TZ',
    value: 'TZ',
  },
  {
    label: 'Thailand',
    key: 'TH',
    value: 'TH',
  },
  {
    label: 'Timor-Leste',
    key: 'TL',
    value: 'TL',
  },
  {
    label: 'Togo',
    key: 'TG',
    value: 'TG',
  },
  {
    label: 'Tokelau',
    key: 'TK',
    value: 'TK',
  },
  {
    label: 'Tonga',
    key: 'TO',
    value: 'TO',
  },
  {
    label: 'Trinidad and Tobago',
    key: 'TT',
    value: 'TT',
  },
  {
    label: 'Tunisia',
    key: 'TN',
    value: 'TN',
  },
  {
    label: 'Turkey',
    key: 'TR',
    value: 'TR',
  },
  {
    label: 'Turkmenistan',
    key: 'TM',
    value: 'TM',
  },
  {
    label: 'Turks and Caicos Islands',
    key: 'TC',
    value: 'TC',
  },
  {
    label: 'Tuvalu',
    key: 'TV',
    value: 'TV',
  },
  {
    label: 'Uganda',
    key: 'UG',
    value: 'UG',
  },
  {
    label: 'Ukraine',
    key: 'UA',
    value: 'UA',
  },
  {
    label: 'United Arab Emirates',
    key: 'AE',
    value: 'AE',
  },
  {
    label: 'United Kingdom',
    key: 'GB',
    value: 'GB',
  },
  {
    label: 'United States',
    key: 'US',
    value: 'US',
  },
  {
    label: 'United States Minor Outlying Islands',
    key: 'UM',
    value: 'UM',
  },
  {
    label: 'Uruguay',
    key: 'UY',
    value: 'UY',
  },
  {
    label: 'Uzbekistan',
    key: 'UZ',
    value: 'UZ',
  },
  {
    label: 'Vanuatu',
    key: 'VU',
    value: 'VU',
  },
  {
    label: 'Venezuela',
    key: 'VE',
    value: 'VE',
  },
  {
    label: 'Viet Nam',
    key: 'VN',
    value: 'VN',
  },
  {
    label: 'Virgin Islands, British',
    key: 'VG',
    value: 'VG',
  },
  {
    label: 'Virgin Islands, U.S.',
    key: 'VI',
    value: 'VI',
  },
  {
    label: 'Wallis and Futuna',
    key: 'WF',
    value: 'WF',
  },
  {
    label: 'Western Sahara',
    key: 'EH',
    value: 'EH',
  },
  {
    label: 'Yemen',
    key: 'YE',
    value: 'YE',
  },
  {
    label: 'Zambia',
    key: 'ZM',
    value: 'ZM',
  },
  {
    label: 'Zimbabwe',
    key: 'ZW',
    value: 'ZW',
  },
];
export const vacanzeCategoryOptions = [
  // Casa Vacanze, B&B, Hotels
  {
    label: 'vacanzeCategoryOp.casaVacanze',
    value: 'casaVacanze',
    key: 'casaVacanze',
  },
  {
    label: 'vacanzeCategoryOp.B&B',
    value: 'B&B',
    key: 'B&B',
  },
  {
    label: 'vacanzeCategoryOp.hotels',
    value: 'hotels',
    key: 'hotels',
  },
  {
    label: 'src.marketplace-custom-config.affittiBrevi',
    value: 'affittiBrevi',
    key: 'affittiBrevi',
  },
];
export const productCategoryOption = [
  { label: 'serviceCategoryOp.clothing', value: 'clothingAccessories', key: 'clothingAccessories' },
  { label: 'serviceCategoryOp.elec', value: 'electronics', key: 'electronics' },
  { label: 'serviceCategoryOp.jewelryAndTrinkets', value: 'jewelryAndTrinkets', key: 'jewelryAndTrinkets' },
  { label: 'serviceCategoryOp.bodyCareAndBeauty', value: 'bodyCareAndBeauty', key: 'bodyCareAndBeauty' },
  { label: 'serviceCategoryOp.hobbies', value: 'hobbiesBooks', key: 'hobbiesBooks' },
  { label: 'serviceCategoryOp.home', value: 'homeGarden', key: 'homeGarden' },
  { label: 'serviceCategoryOp.homeDecorAndFurnishings', value: 'homeDecorAndFurnishings', key: 'homeDecorAndFurnishings' },
  { label: 'serviceCategoryOp.food', value: 'foodBeverage', key: 'foodBeverage' },
  { label: 'serviceCategoryOp.kids', value: 'kidsStuff', key: 'kidsStuff' },
  {
    label: 'serviceCategoryOp.motor',
    value: 'motorsBikesAccessories',
    key: 'motorsBikesAccessories',
  },
  { label: 'serviceCategoryOp.PaintingsAndArtObjects', value: 'PaintingsAndArtObjects', key: 'PaintingsAndArtObjects' },
  { label: 'serviceCategoryOp.booksAndComics', value: 'booksAndComics', key: 'booksAndComics' },
  { label: 'serviceCategoryOp.pets', value: 'petsAccessories', key: 'petsAccessories' },
  { label: 'serviceCategoryOp.sporting', value: 'sportingGoods', key: 'sportingGoods' },
  {
    label: 'serviceCategoryOp.otherCat',
    value: 'otherProductCategories',
    key: 'otherProductCategories',
  },
];

export const listingTypes = [
  { value: 'service', label: 'listingType.service', key: 'service' },
  { value: 'product', label: 'listingType.product', key: 'product' },
  {
    value: 'event',
    label: 'listingType.event',
    key: 'event',
  },
  {
    value: 'vacanze',
    label: 'listingType.vacanze',
    key: 'vacanze',
  },
];

export const deliveryOptions = [
  { value: 'pick_or_delivery', label: 'editListingPricing.pickUp', key: 'pick_or_delivery' },
  { value: 'pick_up_only', label: 'editListingPricing.pickUpOnly', key: 'pick_up_only' },
  { value: 'delivery_only', label: 'editListingPricing.deliverOnly', key: 'delivery_only' },
];
export const bookingDeliveryMethods = [
  { value: 'pick_up_only', label: 'deliveryMethod.pickUp', key: 'pick_up_only' },
  { value: 'delivery_only', label: 'deliveryMethod.delivery', key: 'delivery_only' },
];
export const filters = [
  // {
  //   id: 'dates-length',
  //   label: 'Dates',
  //   type: 'BookingDateRangeLengthFilter',
  //   group: 'primary',
  //   // Note: BookingDateRangeFilter is fixed filter,
  //   // you can't change "queryParamNames: ['dates'],"
  //   queryParamNames: ['dates', 'minDuration'],
  //   config: {
  //     // A global time zone to use in availability searches. As listings
  //     // can be in various time zones, we must decide what time zone we
  //     // use in search when looking for available listings within a
  //     // certain time interval.
  //     //
  //     // If you have all/most listings in a certain time zone, change this
  //     // config value to that.
  //     //
  //     // See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  //     searchTimeZone: 'Etc/UTC',

  //     // Options for the minimum duration of the booking
  //     options: [
  //       { key: '0', label: 'Any length' },
  //       { key: '60', label: '1 hour', shortLabel: '1h' },
  //       { key: '120', label: '2 hours', shortLabel: '2h' },
  //     ],
  //   },
  // },
  {
    id: 'category',
    label: 'Filters.listingType',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      options: [
        { key: 'service', label: 'listingType.service' },
        { key: 'product', label: 'listingType.product' },
      ],
    },
  },
  {
    id: 'serviceCategory',
    label: 'Filters.category',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_subCategory'],
    config: {
      options: categoryOptions,
    },
  },
  {
    id: 'productCategory',
    label: 'Filters.category',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_subCategory'],
    config: {
      options: productCategoryOption,
    },
  },
  {
    id: 'subCategory',
    label: 'Filters.category',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_subCategory'],
    config: {
      options: [],
    },
  },
  {
    id: 'price',
    label: 'Filters.price',
    type: 'PriceFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['pub_price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 1000,
      step: 5,
    },
  },

  // {
  //   id: 'keyword',
  //   label: 'Filters.keyword',
  //   type: 'KeywordFilter',
  //   group: 'primary',
  //   // Note: KeywordFilter is fixed filter,
  //   // you can't change "queryParamNames: ['keywords'],"
  //   queryParamNames: ['keywords'],
  //   // NOTE: If you are ordering search results by distance
  //   // the keyword search can't be used at the same time.
  //   // You can turn on/off ordering by distance from config.js file.
  //   config: {},
  // },
  // {
  //   id: 'yogaStyles',
  //   label: 'Yoga styles',
  //   type: 'SelectMultipleFilter',
  //   group: 'secondary',
  //   queryParamNames: ['pub_yogaStyles'],
  //   config: {
  //     // Optional modes: 'has_all', 'has_any'
  //     // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
  //     searchMode: 'has_all',

  //     // "key" is the option you see in Flex Console.
  //     // "label" is set here for this web app's UI only.
  //     // Note: label is not added through the translation files
  //     // to make filter customizations a bit easier.
  //     options: [
  //       { key: 'ashtanga', label: 'Ashtanga' },
  //       { key: 'hatha', label: 'Hatha' },
  //       { key: 'kundalini', label: 'Kundalini' },
  //       { key: 'restorative', label: 'Restorative' },
  //       { key: 'vinyasa', label: 'Vinyasa' },
  //       { key: 'yin', label: 'Yin' },
  //     ],
  //   },
  // },
  // {
  //   id: 'certificate',
  //   label: 'Certificate',
  //   type: 'SelectSingleFilter',
  //   group: 'secondary',
  //   queryParamNames: ['pub_certificate'],
  //   config: {
  //     // "key" is the option you see in Flex Console.
  //     // "label" is set here for the UI only.
  //     // Note: label is not added through the translation files
  //     // to make filter customizations a bit easier.
  //     options: [
  //       { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  //       { key: '200h', label: 'Registered yoga teacher 200h' },
  //       { key: '500h', label: 'Registered yoga teacher 500h' },
  //     ],
  //   },
  // },
];

export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Note: queryParamName 'sort' is fixed,
  // you can't change it since Flex API expects it to be named as 'sort'
  queryParamName: 'sort',

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  // Keyword filter is sorting the results already by relevance.
  // If keyword filter is active, we need to disable sorting.
  conflictingFilters: ['keyword'],

  options: [
    { key: 'createdAt', label: 'sortFilter.newest' },
    { key: '-createdAt', label: 'sortFilter.oldest' },
    { key: '-pub_price', label: 'sortFilter.lowestP' },
    { key: 'pub_price', label: 'sortFilter.highestP' },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevance', label: 'sortFilter.rel' },
  ],
};
