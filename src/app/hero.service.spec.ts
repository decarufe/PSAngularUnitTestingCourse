import { HeroService } from './hero.service';
import * as TypeMoq from 'typemoq';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { TestBed, inject } from '@angular/core/testing';

describe('hero service', () => {
  let messageService: MessageService;
  let HEROES: Hero[];

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Joe', strength: 5},
      {id: 2, name: 'John', strength: 10},
      {id: 3, name: 'Jack', strength: 15},
    ];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HeroService,
        MessageService,
      ]
    });

    messageService = TestBed.get(MessageService);
  });

  describe('calling getHeroes (inject)', () => {
    it('should return heroes',
      inject([HeroService, HttpTestingController],
        (service: HeroService, controller: HttpTestingController) => {
        let heroes: Hero[];
        service.getHeroes().subscribe(h => {
          heroes = h;
        });

        let request = controller.expectOne('api/heroes');
        request.flush(HEROES);

        expect(heroes.length).toEqual(3);
        controller.verify();
      }));
  });

  describe('calling getHeroes (TestBed)', () => {
    let httpMock: HttpTestingController;
    let heroService: HeroService;

    beforeEach(() => {
      httpMock = TestBed.get(HttpTestingController);
      heroService = TestBed.get(HeroService);
      });

    it('should return heroes', () => {
        let heroes: Hero[];
        heroService.getHeroes().subscribe(h => {
          heroes = h;
        });

        let request = httpMock.expectOne('api/heroes');
        request.flush(HEROES);

        expect(heroes.length).toEqual(3);
        httpMock.verify();
      });
  });

});
