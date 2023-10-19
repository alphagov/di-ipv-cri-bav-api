export interface PersonIdentityNamePart {
	type: string;
	value: string;
}

export interface PersonIdentityName {
	nameParts: PersonIdentityNamePart[];
}

export interface PersonIdentityDateOfBirth {
	value: string;
}

export interface PersonIdentityItem {
	sessionId: string;
	name: PersonIdentityName[];
	birthDate: PersonIdentityDateOfBirth[];
	expiryDate: number;
	createdDate: number;
}

export interface SharedClaimsPersonIdentity {
	sessionId: string;
	name: PersonIdentityName[];
	birthDate: PersonIdentityDateOfBirth[];
}