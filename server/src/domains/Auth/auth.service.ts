import { Injectable } from '@nestjs/common';
import { UserService } from '../Users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
    private jwtService: JwtService) { }

async validateUser(username: string, pass: string): Promise < any > {
  const user = await this.usersService.findOne(username);
  if(user && await bcrypt.compare(pass, user.password)) {
  const { password, ...result } = user;
  return result;
}
return null;
  }

async login(user: any) {
  const payload = { username: user.nickname, sub: user.id };
  return {
    access_token: this.jwtService.sign(payload),
  };
}
}