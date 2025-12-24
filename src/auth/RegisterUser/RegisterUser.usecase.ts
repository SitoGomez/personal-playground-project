import { Inject, Injectable } from '@nestjs/common';

import { ICommandHandler } from '../../shared/commandBus/ICommandHandler';
import {
  IDateTimeService,
  DATE_TIME_SERVICE,
} from '../../shared/dateTimeService/domain/IDateTimeService';
import {
  IEventsStore,
  EVENTS_STORE,
} from '../../shared/events/eventStore/IEventsStore';
import { User } from '../shared/domain/User';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../shared/domain/UserRepository';

import { IPasswordHasher, PASSWORD_HASHER } from './domain/IPasswordHasher';
import { RegisterUserCommand } from './RegisterUser.command';

@Injectable()
export class RegisterUserUseCase
  implements ICommandHandler<RegisterUserCommand>
{
  private readonly userRepository: IUserRepository;
  private readonly eventsStore: IEventsStore;
  private readonly dateTimeService: IDateTimeService;
  private readonly passwordHasher: IPasswordHasher;

  public constructor(
    @Inject(USER_REPOSITORY) userRepository: IUserRepository,
    @Inject(EVENTS_STORE) eventsStore: IEventsStore,
    @Inject(DATE_TIME_SERVICE) dateTimeService: IDateTimeService,
    @Inject(PASSWORD_HASHER) passwordHasher: IPasswordHasher,
  ) {
    this.userRepository = userRepository;
    this.eventsStore = eventsStore;
    this.dateTimeService = dateTimeService;
    this.passwordHasher = passwordHasher;
  }

  public async execute(
    registerUserCommand: RegisterUserCommand,
  ): Promise<void> {
    const { userId, email, password } = registerUserCommand;

    const registeredUser = User.register(
      registerUserCommand.id,
      userId,
      email,
      await this.passwordHasher.hash(password),
      new Date(this.dateTimeService.now()),
    );

    await this.userRepository.register(registeredUser);

    const events = registeredUser.releaseEvents();

    await this.eventsStore.save(events);
  }
}
