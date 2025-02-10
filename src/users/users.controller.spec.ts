import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { CACHE_CONFIG } from '../config/cache';

const mockUsersService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('UsersController', () => {
  let controller: UsersController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register(CACHE_CONFIG)],
      controllers: [UsersController],
      providers: [{ provide: UsersService, useFactory: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com' };
      const expectedUser: User = { id: 1, ...createUserDto };
      service.create.mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);
      expect(result).toEqual(expectedUser);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedUsers: User[] = [{ id: 1, email: 'test@example.com' }];
      service.findAll.mockResolvedValue(expectedUsers);

      const result = await controller.findAll();
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should find a user by ID', async () => {
      const expectedUser: User = { id: 1, email: 'test@example.com' };
      service.findOne.mockResolvedValue(expectedUser);

      const result = await controller.findOne(1);
      expect(result).toEqual(expectedUser);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };
      const expectedUser: User = {
        id: 1,
        email: 'test@example.com',
        ...updateUserDto,
      };
      service.update.mockResolvedValue(expectedUser);

      const result = await controller.update(1, updateUserDto);
      expect(result).toEqual(expectedUser);
      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const expectedUser: User = { id: 1, email: 'test@example.com' };
      service.remove.mockResolvedValue(expectedUser);

      const result = await controller.remove(1);
      expect(result).toEqual(expectedUser);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
