const sinon = require('sinon');
const TechService = require('../../services/technology.service');

describe.only('TechService tests', () => {
  it('has a module', () => {
    expect(TechService).toBeDefined();
  });

  it('getAllTechs test', () => {
    /* Mock model to imitate the find function */
    const MockModel = {
      find: () => {},
    };

    sinon.stub(MockModel, 'find').callsFake(() => {
      return {
        sort: () => sinon.stub().returns(),
      };
    });

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
    const query = {
      sort: { _id: 'DESC' },
      all: true,
    };
    techService.getAllTechs(query);
    const expected = true;
    const actual = MockModel.find.calledOnce;

    expect(actual).toBe(expected);
  });

  it('Create test', () => {
    const create = sinon.spy();

    const MockModel = {
      create,
    };

    const techService = TechService(MockModel);
    techService.createTech({
      name: 'GraphQL',
      type: 'backend',
      icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
    });
    const expected = true;
    const actual = create.calledOnce;

    expect(actual).toBe(expected);
    expect(create.calledWithMatch({ _id: undefined })).toBe(expected);
  });

  it('Update test', () => {
    const findByIdAndUpdate = sinon.spy();

    const MockModel = {
      findByIdAndUpdate,
    };

    const techService = TechService(MockModel);
    techService.updateTech({
      _id: 'id456349898f',
      type: 'fullstack',
    });
    const expected = true;
    const actual = findByIdAndUpdate.calledOnce;

    expect(actual).toBe(expected);
    expect(findByIdAndUpdate.calledWithMatch({ _id: 'id456349898f' })).toBe(
      expected
    );
  });

  it('deleteTech test', () => {
    const MockModel = {
      deleteOne: sinon.spy(),
    };

    const techService = TechService(MockModel);
    techService.deleteTech('id456349898f');
    const expected = true;
    const actual = MockModel.deleteOne.calledOnce;

    expect(actual).toBe(expected);
  });
});
