#include <stdio.h>

main()
{
	printf("�������� �����Ͻʽÿ� (1: ���ָ��� ~ 5: ���ֺҸ�) : ");
	int score;
	scanf_s("%d", &score);
	int good = 0, nomal = 0, bad = 0, people = 0;


	if (1 <= score <= 5) {
		printf("1, 2, 3, 4, 5 �� �ϳ��� ���ڸ� �Է��Ͻʽÿ�.");
	}
	else {
		people += 1;
		switch (score)
		{
			case 1;
				printf("��������� ��ǥ����� ������ �� %d ���߿���\n", people);
				printf("���� : %d �� ���� : %d �� �Ҹ� %d �� �Դϴ�.\n", good, nomal, bad);
		}
	}
}