export default function getCatId() {
  const catid = localStorage.getItem('catID');
  return catid !== null ? catid : 101;
}
