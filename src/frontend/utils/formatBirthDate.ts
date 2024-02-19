/** An example util for formatting birth dates */
export default (dateOfBirth: string): string => new Date(dateOfBirth).toLocaleDateString('de-AT');
