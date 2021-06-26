const sinon = require('sinon');
const TechService = require('../../services/technology.service');

describe.skip('TechService tests', () => {
  it('has a module', () => {
    expect(TechService).toBeDefined();
  });

  it('getAllTechs test', () => {
    /* Mock model to imitate the find function */
    const MockModel = {
      find: () => {},
    };

    sinon.stub(MockModel, 'find').callsFake(() => sinon.stub().returns());

    /** In case we have chained methods 
       * 
       *   like Model.find({}).sort('-_id').limit(10)
       * 
       *  We create a stub to imitate chained methods 
        sinon.stub(MockModel, 'find').callsFake(() => {
            return {
              sort: () => {
                return {
                  limit: sinon.stub().returns()
                }
              }
            }
          })
       */

    const techService = TechService(MockModel);
    techService.getAllTechs();
    const expected = true;
    const actual = MockModel.find.calledOnce;

    expect(actual).toBe(expected);
  });

  it('createOrUpdate test - Create', () => {
    const findOneAndUpdate = sinon.spy();

    const MockModel = {
      findOneAndUpdate,
    };

    const techService = TechService(MockModel);
    techService.createOrUpdateTech({
      name: 'GraphQL',
      type: 'backend',
      icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
    });
    const expected = true;
    const actual = findOneAndUpdate.calledOnce;

    expect(actual).toBe(expected);
    expect(findOneAndUpdate.calledWithMatch({ _id: undefined })).toBe(expected);
  });

  it('createOrUpdate test - Update', () => {
    const findOneAndUpdate = sinon.spy();

    const MockModel = {
      findOneAndUpdate,
    };

    const techService = TechService(MockModel);
    techService.createOrUpdateTech({
      _id: 'id456349898f',
      type: 'fullstack',
    });
    const expected = true;
    const actual = findOneAndUpdate.calledOnce;

    expect(actual).toBe(expected);
    expect(findOneAndUpdate.calledWithMatch({ _id: 'id456349898f' })).toBe(
      expected
    );
  });

  it('deleteTech test', () => {
    const MockModel = {
      findByIdAndDelete: sinon.spy(),
    };

    const techService = TechService(MockModel);
    techService.deleteTech('id456349898f');
    const expected = true;
    const actual = MockModel.findByIdAndDelete.calledOnce;

    expect(actual).toBe(expected);
  });
});
