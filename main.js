function add_subtitle(s) {
  var element_list = s.trim().split(' ');
  $('#subtitle').empty();
  for (var x of element_list) {
    var tag = `<span contenteditable class="subtitle-element">${x}</span>`;
    $('#subtitle').append(tag);
  }
}

$.ready(() => {
  add_subtitle("Lorem ipsum dolor sit amet, consectetur adipiscing elit");
});
