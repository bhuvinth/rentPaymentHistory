import scalarResolvers from './scalarResolvers';

describe('scalarResolvers', () => {
  describe('Date', () => {
    const nowDate = new Date();
    const nowIsoString = nowDate.toISOString();

    describe('serialize', () => {
      it('returns string in ISO8601 format', () => {
        expect(scalarResolvers.Date!.serialize(nowDate)).toEqual(nowIsoString);
      });
    });

    describe('parseValue', () => {
      it('returns date', () => {
        const date = scalarResolvers.Date!.parseValue(nowDate);
        expect(date.toISOString()).toEqual(nowIsoString);
      });
    });
  });
});
