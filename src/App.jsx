import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SortBy = {
  sortByAlphabet: 'alphabet',
  sortByLength: 'length',
};

const getPrepareGoods = (goods, { sortField, reversed }) => {
  const prepareGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortBy.sortByAlphabet:
        prepareGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SortBy.sortByLength:
        prepareGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        return 0;
    }
  }

  if (reversed) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPrepareGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const handleReset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortBy.sortByAlphabet,
          })}
          onClick={() => setSortField(SortBy.sortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortBy.sortByLength,
          })}
          onClick={() => setSortField(SortBy.sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
