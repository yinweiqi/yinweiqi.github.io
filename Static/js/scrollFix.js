/**
 * Created by zaoju on 2016/5/20.
 */
;(function($) {
    jQuery.fn.scrollFix = function(height, dir) {
        height = height || 0;
        height = height == "top" ? 0 : height;
        return this.each(function() {
            if (height == "bottom") {
                height = document.documentElement.clientHeight - this.scrollHeight;
            } else if (height < 0) {
                height = document.documentElement.clientHeight - this.scrollHeight + height;
            }
            var that = $(this),
                oldHeight = false,
                p, r, l = that.offset().left;
            dir = dir == "bottom" ? dir : "top"; //Ĭ�Ϲ�����������
            if (window.XMLHttpRequest) { //��ie6��fixed


                function getHeight() { //>=0��ʾ����Ĺ����߶ȴ��ڵ���Ŀ��߶�
                    return (document.documentElement.scrollTop || document.body.scrollTop) + height - that.offset().top;
                }
                $(window).scroll(function() {
                    if (oldHeight === false) {
                        if ((getHeight() >= 0 && dir == "top") || (getHeight() <= 0 && dir == "bottom")) {
                            oldHeight = that.offset().top - height;
                            that.css({
                                position: "fixed",
                                top: height,
                                left: l
                            });
                        }
                    } else {
                        if (dir == "top" && (document.documentElement.scrollTop || document.body.scrollTop) < oldHeight) {
                            that.css({
                                position: "static"
                            });
                            oldHeight = false;
                        } else if (dir == "bottom" && (document.documentElement.scrollTop || document.body.scrollTop) > oldHeight) {
                            that.css({
                                position: "static"
                            });
                            oldHeight = false;
                        }
                    }
                });
            } else { //for ie6
                $(window).scroll(function() {
                    if (oldHeight === false) { //�ָ�ǰִֻ��һ�Σ�����reflow
                        if ((getHeight() >= 0 && dir == "top") || (getHeight() <= 0 && dir == "bottom")) {
                            oldHeight = that.offset().top - height;
                            r = document.createElement("span");
                            p = that[0].parentNode;
                            p.replaceChild(r, that[0]);
                            document.body.appendChild(that[0]);
                            that[0].style.position = "absolute";
                        }
                    } else if ((dir == "top" && (document.documentElement.scrollTop || document.body.scrollTop) < oldHeight) || (dir == "bottom" && (document.documentElement.scrollTop || document.body.scrollTop) > oldHeight)) { //����
                        that[0].style.position = "static";
                        p.replaceChild(that[0], r);
                        r = null;
                        oldHeight = false;
                    } else { //����
                        that.css({
                            left: l,
                            top: height + document.documentElement.scrollTop
                        })
                    }
                });
            }
        });
    };
})(jQuery);