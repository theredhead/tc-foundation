import { EmailAddress } from "../mail";

export interface Member {
  username: string;
  email: EmailAddress;
  roles: string[];
}

export const memberHasRole = (member: Member, role: string) : boolean => {
  return member.roles.includes(role);
}

