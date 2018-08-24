import { helper } from '@ember/component/helper';


const commuinityPropertyTypes = [
  'Condo',
  'Townhouse',
  'Apartment'
];

export function rentalPropertyType([propertyType]) {
  if(commuinityPropertyTypes.includes(propertyType)) {
    return 'Community';
  }

  return 'Standalone'; 
}


export default helper(rentalPropertyType);
