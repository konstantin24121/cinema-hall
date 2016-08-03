import HallStorage from './HallStorage';
import hallActions from './HallActions';

let HallActions = new hallActions(HallStorage);

const $hall = $('#hall');
const $item = $('.hall__places-item', $hall);
const $itemFree = $('.hall__places-item.is-free', $hall);

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
	let ticket = {
			row: $(this).data('row'),
			tribune: $(this).data('tribune'),
			place: $(this).data('pos-x'),
			price: $(this).data('price'),
		};
	if( $(this).hasClass('is-checked') ){
		$(this).removeClass('is-checked');
		HallActions.removeTicket(ticket);
	}else{
		if(!HallActions.validate() ){
			notie.alert(3, 'За один раз можно заказать не более 5 билетов.', 5) // Never hides unless clicked, or escape or enter is pressed
			return false;
		}
		$(this).addClass('is-checked');
		HallActions.addTicket(ticket);
	}
})
HallActions.rerender()