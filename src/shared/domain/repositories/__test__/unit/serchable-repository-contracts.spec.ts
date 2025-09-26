import {
  SearchParams,
  SearchResult,
  SortDirection,
} from '../../serchable-repository-contracts'

// Tipo para representar todos los valores que queremos probar
type TestPageValue = null | undefined | string | number | boolean | object

describe('Serchable Repository unit tests', () => {
  describe('SearchParams tests', () => {
    it('page prop should be a number and default value should be 1', () => {
      const sut = new SearchParams()
      expect(sut.page).toBe(1)

      const params: Array<{ page: TestPageValue; expected: number }> = [
        { page: null, expected: 1 },
        { page: undefined, expected: 1 },
        { page: '', expected: 1 },
        { page: 'test', expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: 1 },
        { page: 5.5, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
      ]

      params.forEach(item => {
        expect(new SearchParams({ page: item.page as number }).page).toEqual(
          item.expected,
        )
      })
    })

    it('perPage prop should be a number and default value should be 15', () => {
      const sut = new SearchParams()
      expect(sut.perPage).toBe(15)

      const params: Array<{ perPage: TestPageValue; expected: number }> = [
        { perPage: null, expected: 15 },
        { perPage: undefined, expected: 15 },
        { perPage: '', expected: 15 },
        { perPage: 'test', expected: 15 },
        { perPage: 0, expected: 15 },
        { perPage: -1, expected: 15 },
        { perPage: 5.5, expected: 15 },
        { perPage: true, expected: 15 },
        { perPage: false, expected: 15 },
        { perPage: {}, expected: 15 },
        { perPage: 1, expected: 1 },
        { perPage: 2, expected: 2 },
        { perPage: 25, expected: 25 },
      ]

      params.forEach(item => {
        expect(
          new SearchParams({ perPage: item.perPage as number }).perPage,
        ).toEqual(item.expected)
      })
    })

    it('sort prop should be a string or null and default value should be null', () => {
      const sut = new SearchParams()
      expect(sut.sort).toBeNull()

      const params: Array<{ sort: TestPageValue; expected: string | null }> = [
        { sort: null, expected: null },
        { sort: undefined, expected: null },
        { sort: '', expected: null },
        { sort: 'test', expected: 'test' },
        { sort: 'name', expected: 'name' },
        { sort: 'created_at', expected: 'created_at' },
        { sort: 123, expected: '123' },
        { sort: 0, expected: '0' },
        { sort: true, expected: 'true' },
        { sort: false, expected: 'false' },
        { sort: {}, expected: '[object Object]' },
        { sort: [], expected: '' },
      ]

      params.forEach(item => {
        expect(
          new SearchParams({ sort: item.sort as string | null }).sort,
        ).toEqual(item.expected)
      })
    })

    it('sortDir prop should be asc, desc or null and default value should be null', () => {
      const sut = new SearchParams()
      expect(sut.sortDir).toBeNull()

      // Casos cuando sort es null (sortDir debería ser null)
      const paramsWithoutSort: Array<{
        sort: string | null
        sortDir: TestPageValue
        expected: string | null
      }> = [
        { sort: null, sortDir: 'asc', expected: null },
        { sort: null, sortDir: 'desc', expected: null },
        { sort: null, sortDir: 'ASC', expected: null },
        { sort: null, sortDir: 'DESC', expected: null },
        { sort: null, sortDir: 'invalid', expected: null },
        { sort: null, sortDir: null, expected: null },
        { sort: null, sortDir: undefined, expected: null },
        { sort: null, sortDir: '', expected: null },
      ]

      paramsWithoutSort.forEach(item => {
        expect(
          new SearchParams({
            sort: item.sort,
            sortDir: item.sortDir as SortDirection | null,
          }).sortDir,
        ).toEqual(item.expected)
      })

      // Casos cuando sort tiene valor (sortDir debería procesarse)
      const paramsWithSort: Array<{
        sort: string
        sortDir: TestPageValue
        expected: string | null
      }> = [
        { sort: 'field', sortDir: 'asc', expected: 'asc' },
        { sort: 'field', sortDir: 'desc', expected: 'desc' },
        { sort: 'field', sortDir: 'ASC', expected: 'asc' },
        { sort: 'field', sortDir: 'DESC', expected: 'desc' },
        { sort: 'field', sortDir: 'Asc', expected: 'asc' },
        { sort: 'field', sortDir: 'Desc', expected: 'desc' },
        { sort: 'field', sortDir: 'invalid', expected: 'asc' },
        { sort: 'field', sortDir: 'test', expected: 'asc' },
        { sort: 'field', sortDir: '', expected: 'asc' },
        { sort: 'field', sortDir: null, expected: 'asc' },
        { sort: 'field', sortDir: undefined, expected: 'asc' },
        { sort: 'field', sortDir: 123, expected: 'asc' },
        { sort: 'field', sortDir: true, expected: 'asc' },
        { sort: 'field', sortDir: false, expected: 'asc' },
        { sort: 'field', sortDir: {}, expected: 'asc' },
      ]

      paramsWithSort.forEach(item => {
        expect(
          new SearchParams({
            sort: item.sort,
            sortDir: item.sortDir as SortDirection | null,
          }).sortDir,
        ).toEqual(item.expected)
      })
    })

    it('filter prop should be a string or null and default value should be null', () => {
      const sut = new SearchParams()
      expect(sut.filter).toBeNull()

      const params: Array<{
        filter: TestPageValue
        expected: string | null
      }> = [
        { filter: null, expected: null },
        { filter: undefined, expected: null },
        { filter: '', expected: null },
        { filter: 'test', expected: 'test' },
        { filter: 'search term', expected: 'search term' },
        { filter: 'user@example.com', expected: 'user@example.com' },
        { filter: '123', expected: '123' },
        { filter: 0, expected: '0' },
        { filter: true, expected: 'true' },
        { filter: false, expected: 'false' },
        { filter: {}, expected: '[object Object]' },
        { filter: [], expected: '' },
        {
          filter: 'special chars !@#$%^&*()',
          expected: 'special chars !@#$%^&*()',
        },
        { filter: '   whitespace   ', expected: '   whitespace   ' },
      ]

      params.forEach(item => {
        expect(
          new SearchParams({ filter: item.filter as string | null }).filter,
        ).toEqual(item.expected)
      })
    })
  })

  describe('SearchResult tests', () => {
    it('should create SearchResult with null filter', () => {
      const sut = new SearchResult<any, string>({
        items: ['item1', 'item2', 'item3', 'item4'],
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      })

      expect(sut.toJSON()).toStrictEqual({
        items: ['item1', 'item2', 'item3', 'item4'],
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      })
    })

    it('should create SearchResult with string filter', () => {
      const sut = new SearchResult<any, string>({
        items: ['item1', 'item2', 'item3', 'item4'],
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc' as SortDirection,
        filter: 'test',
      })

      expect(sut.toJSON()).toStrictEqual({
        items: ['item1', 'item2', 'item3', 'item4'],
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        sort: 'name',
        sortDir: 'asc' as SortDirection,
        filter: 'test',
      })
    })

    it('should calculate lastPage correctly for different scenarios', () => {
      // Caso 1: total menor que perPage
      let sut = new SearchResult<any, string>({
        items: ['item1', 'item2', 'item3', 'item4'],
        total: 4,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc' as SortDirection,
        filter: 'test',
      })

      expect(sut.lastPage).toBe(1)

      // Caso 2: total mayor que perPage
      sut = new SearchResult<any, string>({
        items: ['item1', 'item2', 'item3', 'item4'],
        total: 54,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc' as SortDirection,
        filter: 'test',
      })

      expect(sut.lastPage).toBe(6)

      // Caso 3: total exactamente divisible por perPage
      sut = new SearchResult<any, string>({
        items: ['item1', 'item2', 'item3', 'item4'],
        total: 50,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc' as SortDirection,
        filter: 'test',
      })

      expect(sut.lastPage).toBe(5)

      // Caso 4: total con resto
      sut = new SearchResult<any, string>({
        items: ['item1', 'item2', 'item3', 'item4'],
        total: 53,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc' as SortDirection,
        filter: 'test',
      })

      expect(sut.lastPage).toBe(6)
    })
  })
})
