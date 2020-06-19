import scalarResolvers from './scalarResolvers';

describe('scalarResolvers', () => {
  describe('Decimal', () => {
    describe('serialize', () => {
      it('returns string', () => {
        expect(scalarResolvers.Decimal!.serialize(1.05)).toEqual('1.05');
      });
    });

    describe('parseValue', () => {
      it('returns number', () => {
        expect(scalarResolvers.Decimal!.parseValue('1.05')).toEqual(1.05);
      });
    });
  });

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
