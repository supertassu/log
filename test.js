import test from 'ava';
import Logger from '.';

test.beforeEach(t => {
	t.context.log = new Logger();
	t.context.log.output = () => {};
});

test('crashes if a renderer is not specified', t => {
	const error = t.throws(() => t.context.log.log());
	t.is(error.message, 'LOGGER_NOT_FOUND');
});

test('test crashes if invalid logger is specified', t => {
	const error = t.throws(() => t.context.log.log('PLEASE_DO_NOT_EXIST', 'lol 132'));
	t.is(error.message, 'LOGGER_NOT_FOUND');
});

test('crashes if no string is specified', t => {
	const error = t.throws(() => t.context.log.log('info'));
	t.is(error.message, 'NO_MESSAGE_SPECIFIED');
});

test('does not fail if all is fine', t => {
	t.true(t.context.log.log('info', 'eyy'));
});

test('does not print anything if logger is disabled (1)', t => {
	t.context.log.output = () => {
		t.fail('something was printed');
	};

	t.context.log.addLogger('disabled', {
		styling: [],
		enabled: false
	}
	);

	t.false(t.context.log.log('disabled', 'ayey'));
});

test('does not print anything if logger is disabled (2)', t => {
	t.context.log.output = () => {
		t.fail('something was printed');
	};

	t.context.log.addLogger('disabled', {
		styling: [],
		enabled: () => false
	}
	);

	t.false(t.context.log.log('disabled', 'ayey'));
});

test('does not print anything if logger is globally disabled (1)', t => {
	t.context.log.output = () => {
		t.fail('something was printed');
	};

	t.context.log.enabled = false;

	t.false(t.context.log.log('info', 'ayey'));
});

test('does not print anything if logger is globally disabled (2)', t => {
	t.context.log.output = () => {
		t.fail('something was printed');
	};

	t.context.log.enabled = () => false;

	t.false(t.context.log.log('info', 'ayey'));
});
