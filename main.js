function update_subtitle(s) {
  var element_list = s.trim().split(' ');
  $('#subtitle').empty();
  for (var [i, v] of element_list.entries()) {
    var tag = `<span contenteditable id="tag-${i}" class="subtitle-element">${v}</span>`;
    $('#subtitle').append(tag);
  }
}

$(function() {
  update_subtitle("Lorem ipsum dolor sit amet, consectetur adipiscing elit");
});
