import { GenerateTopHundredActiveUsersReportReadModel } from '../../../application/GenerateTopHundredActiveUsersReportReadModel';
import { IUsersReportGenerator } from '../../../application/IUsersReportGenerator';

export class UsersReportGeneratorMock implements IUsersReportGenerator {
  private stored: GenerateTopHundredActiveUsersReportReadModel[] = [];

  public getStored(): GenerateTopHundredActiveUsersReportReadModel[] {
    return this.stored;
  }

  public clean(): void {
    this.stored = [];
  }

  public async generateTopHundredActiveUsersReport(
    users: GenerateTopHundredActiveUsersReportReadModel[],
  ): Promise<void> {
    this.stored = users;
    return Promise.resolve();
  }
}
