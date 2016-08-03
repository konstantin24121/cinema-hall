import HallStorage from './HallStorage';

const $hall = $('#hall');
const $item = $('.hall__places-item', $hall);
const $itemFree = $('.hall__places-item.is-free', $hall);
console.log(HallStorage);
// Убирам наведение
let blur = function(){
	$('.hall__line', $hall).removeClass('is-hover');
	$('.hall__row').removeClass('is-dark');
}

$item.on('hover', function(){
	blur()
	//Ставим наведение родителям
	$(this).parents('.hall__row').addClass('is-dark');
	let row = $(this).data('row');
	let tribune = $(this).data('tribune');
	$(`#hallLine_${row}_${tribune}`, $hall).addClass('is-hover');
})

$item.on('mouseout', blur);

$itemFree.on('click', function(){
	$(this).toggleClass('is-checked');


})
