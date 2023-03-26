import { WrapPlaceholder } from './InfoSearch.styled';

export function InfoPlaceholder({ searchName }) {
  return (
    <>
      {searchName && (
        <WrapPlaceholder>
          <h2>Enter text into the search field.</h2>
        </WrapPlaceholder>
      )}
    </>
  );
}
