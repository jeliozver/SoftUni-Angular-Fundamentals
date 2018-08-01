import { FurnitureRoutingModule } from './furniture-routing.module';

describe('FurnitureRoutingModule', () => {
  let furnitureRoutingModule: FurnitureRoutingModule;

  beforeEach(() => {
    furnitureRoutingModule = new FurnitureRoutingModule();
  });

  it('should create an instance', () => {
    expect(furnitureRoutingModule).toBeTruthy();
  });
});
