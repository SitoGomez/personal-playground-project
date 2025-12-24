import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Headers,
} from '@nestjs/common';

import {
  ICommandBus,
  COMMAND_BUS,
} from '../../../../shared/commandBus/ICommandBus';
import { LoginUserCommand } from '../../application/LoginUser.command';
import { LoginUserResponse } from '../../application/LoginUserResponse.type';

import { LoginUserControllerInputDto } from './LoginUserControllerInput.dto';
import { LoginUserControllerOutputDto } from './LoginUserControllerOutput.dto';

@Controller()
export class LoginUserController {
  private readonly commandBus: ICommandBus;

  public constructor(@Inject(COMMAND_BUS) commandBus: ICommandBus) {
    this.commandBus = commandBus;
  }

  @Post('/users/login')
  @HttpCode(HttpStatus.OK)
  public async handle(
    @Headers('x-request-id') requestId: string,
    @Body() body: LoginUserControllerInputDto,
  ): Promise<LoginUserControllerOutputDto> {
    const command = new LoginUserCommand(requestId, body.email, body.password);

    const commandResult = await this.commandBus.execute<
      LoginUserCommand,
      LoginUserResponse
    >(command);

    return new LoginUserControllerOutputDto(commandResult.access_token);
  }
}
