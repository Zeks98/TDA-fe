export class Tda {
  id: number;
  firstName: string;
  lastName: string;
  job: string;
  education: string;
  jobE: string;
  isEdit: boolean;

  constructor(id: number, firstName: string, lastName: string, job: string, education: string, jobE: string, isEdit: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.job = job;
    this.education = education;
    this.jobE = jobE;
    this.isEdit = isEdit;
  }
}

