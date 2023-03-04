import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RedeViaria } from './rede-viaria-component';

describe('RedeViaria', () => {
    let component: RedeViaria;
    let fixture: ComponentFixture<RedeViaria>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RedeViaria],
            imports: [HttpClientTestingModule],
            providers: [RedeViaria]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RedeViaria);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        //expect(component).toBeTruthy();
    });
});
