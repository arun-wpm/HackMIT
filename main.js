var vtt = "WEBVTT\n\n1\n00:00.000 --> 00:20.000\n[Music]\n\n1\n00:20.500 --> 00:40.000\ndu du du du DUH DUH! $O(n\\log{n})$",
    parser = new WebVTT.Parser(window, WebVTT.StringDecoder()),
    cues = [],
    regions = [];
parser.oncue = function(cue) {
    cues.push(cue);
};
parser.onregion = function(region) {
    regions.push(region);
}
parser.parse(vtt);
parser.flush();

var editing = 0;
var cur;

function update_subtitle(s, render) {
    var element_list = s.trim().split(' ');
    $('#subtitle').empty();
    for (var [i, v] of element_list.entries()) {
        var tag = `<span contenteditable id="tag-${i}" onclick="edit();" class="subtitle-element">${v}</span>`;
        $('#subtitle').append(tag);
    }

    if (render)
        MathJax.typeset()
}

function edit() {
    $('#vid')[0].pause();
    if (editing == 0)
        update_subtitle(cues[cur].text, 0);
    editing = 1;
    //add a submit changes! button here
}

function binSearch(cues, curtime) {
    var min = 0, mid, max = cues.length - 1;
    while (max != min) {
        if (max - min == 1) {
            if (curtime >= cues[max].startTime)
                return max;
            else
                return min;
        }
        mid = (min + max)/2;
        if (curtime >= cues[mid].startTime)
            min = mid;
        else
            max = mid;
    }
}

function display(render){
    var curtime = $('#vid')[0].currentTime;
    var cnt = binSearch(cues, curtime);
    if (cnt < cues.length) {
        if (curtime >= cues[cnt].startTime)
            if (cur != cnt || editing == 1) {
                editing = 0;
                update_subtitle(cues[cnt].text, render);
                cur = cnt;
            }
        if (curtime >= cues[cnt].endTime)
            $('#subtitle').empty();
    }
}

$(function() {
    $('#vid').on('timeupdate', function() {display(1)});
});
