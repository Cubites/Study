#include <stdio.h>

main()
{
	char ch1 = 'y', ch2 = 'e', ch3 = 's';

	printf("putchar = ");
	putchar(ch1); putchar(ch2); putchar(ch3);
	putchar('\n');

	// put()�Լ��� ���ڿ��� ǥ�������ġ�� stdout(�͹̳�)�� ����Ѵ�.
	printf("puts = ");
	puts("yes yes \n");

	//printf�� �پ��� ���������ڸ� ���� ���� ������ �����Ϳ� �齽���� ���ڻ���� ����� �����ϴ�.
	printf("���ٱ��� �Է� �� �ٹٲٱ� \n");
	printf("�������� ��ü�� ����ϱ� : \\ \n");
	printf("�����ο��ȣ�� ����ϱ� : \" \n\n");
}