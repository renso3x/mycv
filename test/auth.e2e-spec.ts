import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'admin1234@admin.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: 'test123',
      })
      .expect(201)
      .then((res) => {
        const { id, email: userEmail } = res.body;
        expect(id).toBeDefined();
        expect(userEmail).toEqual(email);
      });
  });

  it('signup as a new user then get current logged in user', async () => {
    const email = 'admin1234@admin.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: 'test123',
      })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie);

    expect(body.email).toEqual(email);
  });
});
