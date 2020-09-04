// 观察者的目的就是给需要变化的那个元素增加一个观察者，
// 当数据变化时执行对应的方向
class Watcher {
	constructor(vm, expr, cb) {
		this.vm = vm;
		this.expr = expr;
		this.cb = cb;

		// 先获取oldval
		this.oldVal = this.getOld()
	}
	/**
	 * 获取旧值
	 * @return {[type]} [description]
	 */
	getOld() {
		Dep.target = this;
		// 这里会走到observe的get方法，然后存下这个watcher
		let oldVal = this.getVal(this.vm, this.expr);
		// 再置空
		Dep.target = null;
		return oldVal;
	}
	update() {
		let newVal = this.getVal(this.vm, this.expr);
		let oldVal = this.oldVal;
		if(newVal !== oldVal) {
			this.cb(oldVal, newVal);
		}
	}
	// message.a.b.c
	getVal(vm, expr, type) {
		expr = expr.split('.');
		// 把上一级的结果返回给下一级
		return expr.reduce((prev, next) => {
			return prev[next];
		}, vm.$data)
		// vm.$data 会作为第一个prev
	}
}