import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../config/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = () => ({
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

describe('UsersService', () => {
  let service: UsersService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useFactory: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com' };
      const expectedUser = { id: 1, ...createUserDto };
      prisma.user.create.mockResolvedValue(expectedUser);

      const result = await service.create(createUserDto);
      expect(result).toEqual(expectedUser);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: createUserDto });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedUsers = [{ id: 1, email: 'test@example.com' }];
      prisma.user.findMany.mockResolvedValue(expectedUsers);

      const result = await service.findAll();
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const expectedUser = { id: 1, email: 'test@example.com' };
      prisma.user.findUnique.mockResolvedValue(expectedUser);

      const result = await service.findOne(1);
      expect(result).toEqual(expectedUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if user is not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };
      const expectedUser = {
        id: 1,
        email: 'test@example.com',
        ...updateUserDto,
      };
      prisma.user.update.mockResolvedValue(expectedUser);

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual(expectedUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
      });
    });

    it('should throw NotFoundException if user to update is not found', async () => {
      prisma.user.update.mockRejectedValue({ code: 'P2025' });
      await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const expectedUser = { id: 1, email: 'test@example.com' };
      prisma.user.delete.mockResolvedValue(expectedUser);

      const result = await service.remove(1);
      expect(result).toEqual(expectedUser);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if user to delete is not found', async () => {
      prisma.user.delete.mockRejectedValue({ code: 'P2025' });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
