import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';


describe('Heroes component', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Joe', strength: 5},
      {id: 2, name: 'John', strength: 10},
      {id: 3, name: 'Jack', strength: 15},
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heros correclty from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });
});
